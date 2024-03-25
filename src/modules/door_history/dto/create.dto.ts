import { IsNumber } from "class-validator";
import { AccessCardsEntity } from "src/modules/access_cards/entities/accessCards.entity";
import { DoorsEntity } from "src/modules/doors/entities/doors.entity";

export class CreateDoorHistoryDto {
    @IsNumber({}, {message: 'Campo door deve ser um número'})
    readonly door: DoorsEntity;

    @IsNumber({}, {message: 'Campo accessCard deve ser um número'})
    readonly accessCard: AccessCardsEntity;
}