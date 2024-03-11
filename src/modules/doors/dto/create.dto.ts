import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DoorsState } from '../enum/doors.state';
import { IsValidEnum } from 'src/core/constraints/isValidEnum.decorator';

export class CreateDoorDto {
  @IsString({ message: 'Campo name deve ser uma string' })
  @IsNotEmpty({ message: 'Campo name não pode ser vazio' })
  readonly name: string;

  @IsString({ message: 'Campo readerModel deve ser uma string' })
  @IsNotEmpty({ message: 'Campo readerModel não pode ser vazio' })
  readonly readerModel: string;

  @IsBoolean({ message: 'Campo isOpen deve ser um booleano' })
  @IsNotEmpty({ message: 'Campo isOpen não pode ser vazio' })
  readonly isOpen: boolean;

  @IsValidEnum(DoorsState)
  readonly state: DoorsState;
}
