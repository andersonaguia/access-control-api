import { HttpStatus, Injectable } from '@nestjs/common';
import { DoorsRepository } from '../doors.respository';
import { CreateDoorDto } from '../dto/create.dto';
import { DoorsEntity } from '../entities/doors.entity';
import { AccessDoorDto } from '../dto/access.dto';
import { StateDoorDto } from '../dto/state.dto';
import { AccessCardsService } from 'src/modules/access_cards/services/accessCards.service';
import { DoorsState } from '../enum/doors.state';
import { AccessCardRole } from 'src/modules/access_cards/enum/accessCard.role';
import { ControllerAccessDoorDto } from '../../events/dto/controllerAccessDoor.dto';

@Injectable()
export class DoorsService {
  constructor(
    private readonly doorsRepository: DoorsRepository,
    private readonly accessCardsService: AccessCardsService,
  ) {}

  add(doorData: CreateDoorDto, req: any): Promise<DoorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.user;

        const newDoor = new DoorsEntity();
        newDoor.name = doorData.name.toUpperCase();
        newDoor.readerModel = doorData.readerModel;
        newDoor.isOpen = doorData.isOpen;
        newDoor.state = doorData.state;
        newDoor.registeredBy = id;
        newDoor.createdAt = new Date();

        const doorSaved = await this.doorsRepository.add(newDoor);

        resolve(doorSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll(): Promise<DoorsEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const availableDoors = await this.doorsRepository.findAll();
        resolve(availableDoors);
      } catch (error) {
        reject(error);
      }
    });
  }

  access(accessData: AccessDoorDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.doorsRepository.findById(+accessData.doorId);
        if (!door) {
          reject({
            statusCode: HttpStatus.NOT_FOUND,
            message: `Nenhuma porta encontrada para o id ${accessData.doorId}`,
          });
        } else {
          const card = await this.accessCardsService.findByNumber(
            accessData.cardNumber,
          );
          if (!card) {
            reject({
              statusCode: HttpStatus.NOT_FOUND,
              message: `Nenhum registro encontrado para o cartão ${accessData.cardNumber}`,
            });
          } else {
            if (
              door.state == DoorsState.OPEN ||
              card.role == AccessCardRole.ADMIN
            ) {
              const result = await this.doorsRepository.access(accessData);
              resolve(result);
            } else {
              const doorStateKey = DoorsState[door.state];
              reject({
                statusCode: HttpStatus.FORBIDDEN,
                message: `Acesso negado. Porta está com status ${doorStateKey}`,
              });
            }
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  changeState(stateData: StateDoorDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.doorsRepository.changeState(stateData);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  controllerAccess(accessData: ControllerAccessDoorDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.doorsRepository.controllerAccess(accessData);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(doorId: number): Promise<DoorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.doorsRepository.findById(+doorId);
        resolve(door);
      } catch (error) {
        reject(error);
      }
    });
  }

  checkInitialStateByDoorId(doorId: number): Promise<DoorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const door = await this.doorsRepository.checkInitialStateByDoorId(+doorId);
        resolve(door);
      } catch (error) {
        reject(error);
      }
    });
  }
}
