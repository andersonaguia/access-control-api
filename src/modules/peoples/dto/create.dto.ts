import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SourcesEntity } from 'src/modules/sources/entities/sources.entity';

export class CreatePeopleDto {
  @IsString({ message: 'Campo fullName deve ser uma string' })
  @IsNotEmpty({ message: 'Campo fullName não pode ser vazio' })
  readonly fullName: string;

  @IsOptional()
  @IsEmail({}, {message: 'Campo email deve ser um e-mail válido'})
  readonly email?: string;

  @IsOptional()
  @IsString({ message: 'Campo phoneNumber deve ser uma string' })  
  readonly phoneNumber?: string;

  @IsNumber({}, { message: 'Campo sourceId deve ser um número' })
  readonly sourceId: SourcesEntity;
}
