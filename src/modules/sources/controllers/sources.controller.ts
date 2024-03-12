import {
  Body,
  Controller,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SourcesService } from '../services/sources.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { UserRole } from 'src/modules/system_users/enum/user.role';
import { CreateSourceDto } from '../dto/create.dto';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/new')
  async add(@Body() sourceData: CreateSourceDto, @Request() req: any) {
    try {
      const result = await this.sourcesService.add(sourceData, req);
      if (result.id) {
        return { code: 201, message: 'Fonte cadastrada com sucesso' };
      }
    } catch (error) {
      throw new HttpException({ error }, error.code);
    }
  }
}
