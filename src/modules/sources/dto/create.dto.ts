import { IsNotEmpty, IsString } from "class-validator";

export class CreateSourceDto {
    @IsString({message: 'O campo sourceName deve ser uma string'})
    @IsNotEmpty({message: 'O campo sourceName não pode ser vazio'})
    sourceName: string;
}