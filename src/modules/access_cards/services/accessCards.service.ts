import { Injectable } from '@nestjs/common';
import { CreateAccessCardDto } from '../dto/create.dto';
import { AccessCardsEntity } from '../entities/accessCards.entity';
import { AccessCardsRepository } from '../accessCards.repository';

@Injectable()
export class AccessCardsService {
  constructor(private readonly accessCardsRepository: AccessCardsRepository) {}

  add(
    accessCardData: CreateAccessCardDto,
    req: any,
  ): Promise<AccessCardsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.user;

        const newAccessCard = new AccessCardsEntity();
        newAccessCard.createdAt = new Date();
        newAccessCard.registeredBy = id;
        newAccessCard.cardNumber = accessCardData.cardNumber;
        newAccessCard.people = accessCardData.peopleId;
        newAccessCard.role = accessCardData.role;

        const accessCardSaved = await this.accessCardsRepository.add(
          newAccessCard,
        );
        resolve(accessCardSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll(): Promise<AccessCardsEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessCards = await this.accessCardsRepository.findAll();
        resolve(accessCards);
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<AccessCardsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessCardFound = await this.accessCardsRepository.findById(+id);
        resolve(accessCardFound);
      } catch (error) {
        reject(error);
      }
    });
  }
}
