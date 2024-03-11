import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DoorsState } from '../enum/doors.state';
import { IsValidEnum } from 'src/core/constraints/isValidEnum.decorator';

export class StateDoorDto {
  @IsNumber({}, { message: 'Campo doorId deve ser um numero' })
  @IsNotEmpty({ message: 'Campo doorId não pode ser vazio' })
  readonly doorId: number;

  @IsNotEmpty({ message: 'Campo state não pode ser vazio' })
  @IsValidEnum(DoorsState)
  readonly state: DoorsState;
}