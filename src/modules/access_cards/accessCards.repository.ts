import { DataSource, IsNull, QueryFailedError, Repository } from 'typeorm';
import { AccessCardsEntity } from './entities/accessCards.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { MySqlDriverError } from 'src/core/database/Interfaces';

@Injectable()
export class AccessCardsRepository extends Repository<AccessCardsEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(AccessCardsEntity, dataSource.createEntityManager());
  }

  add(accessCard: AccessCardsEntity): Promise<AccessCardsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessCardSaved = await this.save(accessCard);
        resolve(accessCardSaved);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const mysqlError: MySqlDriverError = error.driverError;

          if (mysqlError.errno == 1062) {
            reject({
              statusCode: HttpStatus.CONFLICT,
              message: mysqlError.sqlMessage,
            });
          }else if(mysqlError.errno == 1452){
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

  findAll(): Promise<AccessCardsEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessCards = await this.find({ where: { deletedAt: IsNull() } });
        resolve(accessCards);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const mysqlError: MySqlDriverError = error.driverError;
          reject({
            statusCode: HttpStatus.BAD_REQUEST,
            message: mysqlError.sqlMessage,
          });
        }
        reject({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error,
        });
      }
    });
  }

  findById(id: number): Promise<AccessCardsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessCardFound = await this.findOne({
          where: { id: +id, deletedAt: IsNull() },
          loadRelationIds: true,
        });
        if (accessCardFound.id) {
          resolve(accessCardFound);
        }
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const mysqlError: MySqlDriverError = error.driverError;
          reject({
            statusCode: HttpStatus.BAD_REQUEST,
            message: mysqlError.sqlMessage,
          });
        } else if (error.message) {
          error.message.includes(
            `Cannot read properties of null (reading 'id')`,
          )
            ? reject({
                statusCode: HttpStatus.NOT_FOUND,
                message: `Nenhum registro encontrado para o id ${id}`,
              })
            : reject({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error,
              });
        }
        reject({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error,
        });
      }
    });
  }

  findByNumber(cardNumber: string): Promise<AccessCardsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessCardFound = await this.findOne({
          where: { cardNumber: cardNumber, deletedAt: IsNull() },
          loadRelationIds: true,
        });
        if (accessCardFound.id) {
          resolve(accessCardFound);
        }
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const mysqlError: MySqlDriverError = error.driverError;
          reject({
            statusCode: HttpStatus.BAD_REQUEST,
            message: mysqlError.sqlMessage,
          });
        } else if (error.message) {
          error.message.includes(
            `Cannot read properties of null (reading 'id')`,
          )
            ? reject({
                statusCode: HttpStatus.NOT_FOUND,
                message: `Nenhum registro encontrado para o cartão ${cardNumber}`,
              })
            : reject({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error,
              });
        }
        reject({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error,
        });
      }
    });
  }
}
