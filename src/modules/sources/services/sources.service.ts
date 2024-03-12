import { Injectable } from '@nestjs/common';
import { SourcesRepository } from '../sources.repository';
import { SourcesEntity } from '../entities/sources.entity';
import { CreateSourceDto } from '../dto/create.dto';

@Injectable()
export class SourcesService {
  constructor(private readonly sourcesRepository: SourcesRepository) {}

  add(sourceData: CreateSourceDto, req: any): Promise<SourcesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const {id} = req.user;
        const newSource = new SourcesEntity();
        newSource.name = sourceData.sourceName.toUpperCase();
        newSource.registeredBy = id;
        newSource.createdAt = new Date();
        
        const sourceSaved = await this.sourcesRepository.add(newSource);
        resolve(sourceSaved);
      } catch (error) {
        reject(error);
      }
    });
  }
}
