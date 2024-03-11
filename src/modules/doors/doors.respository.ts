import { DataSource, Equal, IsNull, Repository } from 'typeorm';
import { DoorsEntity } from './entities/doors.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AccessDoorDto } from './dto/access.dto';
import { DoorsState } from './enum/doors.state';
import { StateDoorDto } from './dto/state.dto';

@Injectable()
export class DoorsRepository extends Repository<DoorsEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
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
            code: HttpStatus.NOT_FOUND,
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
              code: HttpStatus.BAD_REQUEST,
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
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.findById(+accessData.doorId);
        if (!door) {
          reject({
            code: HttpStatus.NOT_FOUND,
            message: 'Porta não encontrada',
          });
        } else {
          if (door.state == DoorsState.OPEN) {
            const dataToUpdate = {
              isOpen: accessData.isOpen,
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
            }
          } else {
            const doorStateKey = DoorsState[door.state];
            reject({
              code: HttpStatus.FORBIDDEN,
              message: `Acesso negado. Ambiente está com status ${doorStateKey}`,
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
