import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccessDoorDto {
  @IsNumber({}, { message: 'Campo doorId deve ser um numero' })
  @IsNotEmpty({ message: 'Campo doorId não pode ser vazio' })
  readonly doorId: number;

  @IsBoolean({ message: 'Campo isOpen deve ser um booleano' })
  @IsNotEmpty({ message: 'Campo isOpen não pode ser vazio' })
  readonly isOpen: boolean;

  @IsString({ message: 'Campo cardNumber deve ser uma string' })
  @IsNotEmpty({ message: 'Campo cardNumber não pode ser vazio' })
  readonly cardNumber: string;
}
