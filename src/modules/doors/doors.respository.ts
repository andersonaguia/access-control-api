import { DataSource, Equal, IsNull, Repository } from 'typeorm';
import { DoorsEntity } from './entities/doors.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { AccessDoorDto } from './dto/access.dto';
import { StateDoorDto } from './dto/state.dto';
import { ControllerAccessDoorDto } from '../events/dto/controllerAccessDoor.dto';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class DoorsRepository extends Repository<DoorsEntity> {
  constructor(
    @Inject(EventsGateway)
    private eventsGateway: EventsGateway,
    @InjectDataSource() dataSource: DataSource,
  ) {
    super(DoorsEntity, dataSource.createEntityManager());
  }

  add(doorData: DoorsEntity): Promise<DoorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.save(doorData);
       
        resolve(door);
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(doorId: number): Promise<DoorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.findOne({ where: { id: +doorId } });
        resolve(door);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll(): Promise<DoorsEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const availableDoors = await this.find({
          where: { deletedAt: IsNull() },
          loadRelationIds: true,
        });
        resolve(availableDoors);
      } catch (error) {
        reject(error);
      }
    });
  }

  changeState(stateData: StateDoorDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.findById(+stateData.doorId);
        if (!door) {
          reject({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Porta não encontrada',
          });
        } else {
          const dataToUpdate = {
            state: stateData.state,
            updatedAt: new Date(),
          };

          const { affected } = await this.update(
            {
              id: Equal(door.id),
            },
            dataToUpdate,
          );

          if (affected > 0) {
            resolve({
              statusCode: 200,
              message: 'Dados atualizados com sucesso',
            });
          } else {
            reject({
              statusCode: HttpStatus.BAD_REQUEST,
              message: `Algo deu errado, tente novamente`,
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  access(accessData: AccessDoorDto): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.eventsGateway.sendMessage('doors', {
          doorId: accessData.doorId,
          isOpen: accessData.isOpen,
        });
        resolve({
          statusCode: 200,
          message: 'Solicitação enviada com sucesso',
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  checkInitialStateByDoorId(doorId: number): Promise<DoorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.findOne({ where: { id: +doorId } });
        this.eventsGateway.sendMessage('doors', {
          doorId: door.id,
          isOpen: door.isOpen,
        });
        resolve(door);
      } catch (error) {
        reject(error);
      }
    });
  }

  controllerAccess(accessData: ControllerAccessDoorDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const dataToUpdate = {
          isOpen: accessData.isOpen,
          updatedAt: new Date(),
        };

        const { affected } = await this.update(
          {
            id: Equal(+accessData.doorId),
          },
          dataToUpdate,
        );

        if (affected > 0) {
          resolve({
            doorId: accessData.doorId,
            isOpen: accessData.isOpen,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
