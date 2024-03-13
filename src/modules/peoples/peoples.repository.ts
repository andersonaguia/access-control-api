import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, IsNull, QueryFailedError, Repository } from 'typeorm';
import { PeoplesEntity } from './entities/peoples.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { MySqlDriverError } from 'src/core/database/Interfaces';

@Injectable()
export class PeoplesRepository extends Repository<PeoplesEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(PeoplesEntity, dataSource.createEntityManager());
  }

  add(newPeople: PeoplesEntity): Promise<PeoplesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const peopleSaved = await this.save(newPeople);
        resolve(peopleSaved);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const mysqlError: MySqlDriverError = error.driverError;

          if (mysqlError.errno == 1062) {
            reject({
              statusCode: HttpStatus.CONFLICT,
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

  findAll(): Promise<PeoplesEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const peoples = await this.find({ where: { deletedAt: IsNull() } });
        resolve(peoples);
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

  findById(id: number): Promise<PeoplesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const peopleFound = await this.findOne({
          where: { id: +id, deletedAt: IsNull() },
          loadRelationIds: true,
        });
        if (peopleFound.id) {
          resolve(peopleFound);
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
}
