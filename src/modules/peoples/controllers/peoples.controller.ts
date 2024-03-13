import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PeoplesService } from '../services/peoples.service';
import { CreatePeopleDto } from '../dto/create.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { UserRole } from 'src/modules/system_users/enum/user.role';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

@Controller('peoples')
export class PeoplesController {
  constructor(private readonly peopleService: PeoplesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR)
  @Post('new')
  async add(@Body() peopleData: CreatePeopleDto, @Request() req: any) {
    try {
      const result = await this.peopleService.add(peopleData, req);
      if (result.id) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withHeaders({ Location: `/peoples/${result.id}` })
          .withBody({
            message: 'Cadastro realizado com sucesso',
          })
          .build();
      }
    } catch (error) {
      throw new HttpException(error, error.statusCode);
    }
  }

  @Get('findall')
  async findAll() {
    try {
      const result = await this.peopleService.findAll();
      if (result) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.OK)
          .withHeaders({})
          .withBody({
            peoples: result,
          })
          .build();
      }
    } catch (error) {
      throw new HttpException(error, error.statusCode);
    }
  }

  @Get('findbyid/:id')
  async findById(@Param('id') id: number) {
    try {
      const result = await this.peopleService.findById(+id);
      if (result.id) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.OK)
          .withHeaders({})
          .withBody({
            people: result,
          })
          .build();
      }
    } catch (error) {
      throw new HttpException(error, error.statusCode);
    }
  }
}
