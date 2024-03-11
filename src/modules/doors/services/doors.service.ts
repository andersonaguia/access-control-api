import { Injectable } from '@nestjs/common';
import { DoorsRepository } from '../doors.respository';
import { CreateDoorDto } from '../dto/create.dto';
import { DoorsEntity } from '../entities/doors.entity';
import { AccessDoorDto } from '../dto/access.dto';
import { StateDoorDto } from '../dto/state.dto';

@Injectable()
export class DoorsService {
  constructor(private readonly doorsRepository: DoorsRepository) {}

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

  findAll(): Promise<DoorsEntity[]>{
    return new Promise(async(resolve, reject) => {
        try{
            const availableDoors = await this.doorsRepository.findAll();
            resolve(availableDoors);

        }catch(error){
            reject(error);
        }
    })
  }

  access(accessData: AccessDoorDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.doorsRepository.access(accessData);
        resolve(result);
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
}
