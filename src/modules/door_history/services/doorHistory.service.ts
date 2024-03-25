import { Injectable } from '@nestjs/common';
import { DoorHistoryEntity } from '../entities/doorHistory.entity';
import { CreateDoorHistoryDto } from '../dto/create.dto';
import { DoorHistoryRepository } from '../doorHistory.repository';

@Injectable()
export class DoorHistoryService {
  constructor(private readonly doorHistoryRepository: DoorHistoryRepository) {}

  add(doorHistoryData: CreateDoorHistoryDto): Promise<DoorHistoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const newDoorHistory = new DoorHistoryEntity();
        newDoorHistory.accessCard = doorHistoryData.accessCard;
        newDoorHistory.door = doorHistoryData.door;
        newDoorHistory.createdAt = new Date();

        const newDoorHistorySaved = await this.doorHistoryRepository.add(
          newDoorHistory,
        );
        resolve(newDoorHistorySaved);
      } catch (error) {
        reject(error);
      }
    });
  }
}
