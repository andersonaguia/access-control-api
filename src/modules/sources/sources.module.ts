import { Module } from "@nestjs/common";
import { SourcesController } from "./controllers/sources.controller";
import { SourcesService } from "./services/sources.service";
import { SourcesRepository } from "./sources.repository";

@Module({
    imports: [],
    controllers: [SourcesController],
    providers: [SourcesService, SourcesRepository],
    exports: []
})
export class SourcesModule{}
