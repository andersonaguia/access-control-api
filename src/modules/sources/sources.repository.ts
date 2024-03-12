import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SourcesEntity } from './entities/sources.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class SourcesRepository extends Repository<SourcesEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(SourcesEntity, dataSource.createEntityManager());
  }

  add(sourceData: SourcesEntity): Promise<SourcesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const source = await this.save(sourceData);
        resolve(source);
      } catch (error) {
        if(error.errno == 1062){
            reject({
                code: HttpStatus.CONFLICT,
                message: `Já existe uma fonte cadastrada com o nome ${sourceData.name}`,
              });
        }
        reject({
          code: HttpStatus.BAD_REQUEST,
          message: error,
        });
      }
    });
  }
}
