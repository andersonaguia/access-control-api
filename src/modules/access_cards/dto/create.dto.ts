import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidEnum } from 'src/core/constraints/isValidEnum.decorator';
import { PeoplesEntity } from 'src/modules/peoples/entities/peoples.entity';
import { AccessCardRole } from '../enum/accessCard.role';

export class CreateAccessCardDto {
  @IsString({ message: 'Campo cardNumber deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo cardNumber não pode ser vazio' })
  readonly cardNumber: string;

  @IsNumber({}, { message: 'Campo peopleId deve ser um número' })
  readonly peopleId: PeoplesEntity;

  @IsValidEnum(AccessCardRole)
  readonly role: AccessCardRole;
}
