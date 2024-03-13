import { Injectable } from '@nestjs/common';
import { PeoplesRepository } from '../peoples.repository';
import { PeoplesEntity } from '../entities/peoples.entity';
import { CreatePeopleDto } from '../dto/create.dto';

@Injectable()
export class PeoplesService {
  constructor(private readonly peoplesRepository: PeoplesRepository) {}

  add(peopleData: CreatePeopleDto, req: any): Promise<PeoplesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.user;

        const newPeople = new PeoplesEntity();
        newPeople.fullName = peopleData.fullName;
        newPeople.sourceId = peopleData.sourceId;
        peopleData.phoneNumber
          ? (newPeople.phoneNumber = peopleData.phoneNumber)
          : (newPeople.phoneNumber = null);
        peopleData.email
          ? (newPeople.email = peopleData.email)
          : (newPeople.email = null);
        newPeople.registeredBy = id;

        const peopleSaved = await this.peoplesRepository.add(newPeople);

        resolve(peopleSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll(): Promise<PeoplesEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const peoples = await this.peoplesRepository.findAll();
        resolve(peoples);
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<PeoplesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const peopleFound = await this.peoplesRepository.findById(+id);
        resolve(peopleFound);
      } catch (error) {
        reject(error);
      }
    });
  }
}
