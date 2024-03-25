import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { DoorHistoryEntity } from './entities/doorHistory.entity';
import { MySqlDriverError } from 'src/core/database/Interfaces';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class DoorHistoryRepository extends Repository<DoorHistoryEntity> {
    constructor(@InjectDataSource() dataSource: DataSource) {
      super(DoorHistoryEntity, dataSource.createEntityManager());
    }

  add(doorHistory: DoorHistoryEntity): Promise<DoorHistoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const doorHistorySaved = await this.save(doorHistory);
        resolve(doorHistorySaved);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const mysqlError: MySqlDriverError = error.driverError;

          if (mysqlError.errno == 1452) {
            reject({
              statusCode: HttpStatus.BAD_REQUEST,
              message: mysqlError.sqlMessage,
            });
          }
        }
        reject({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error,
        });
      }
    });
  }
}
