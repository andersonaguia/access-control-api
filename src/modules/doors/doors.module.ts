import { Module } from "@nestjs/common";
import { DoorsService } from "./services/doors.service";
import { DoorsRepository } from "./doors.respository";
import { DoorsController } from "./controllers/doors.controllers";

@Module({
    imports: [],
    controllers: [DoorsController],
    providers: [DoorsService, DoorsRepository],
    exports:[]
})
export class DoorsModule{}
