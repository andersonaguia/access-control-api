import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DoorsService } from '../services/doors.service';
import { CreateDoorDto } from '../dto/create.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { UserRole } from 'src/modules/system_users/enum/user.role';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { NestResponse } from 'src/core/http/nest-response';
import { AccessDoorDto } from '../dto/access.dto';
import { StateDoorDto } from '../dto/state.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/new')
  async add(
    @Body() doorData: CreateDoorDto,
    @Request() req: any,
  ): Promise<NestResponse> {
    try {
      const result = await this.doorsService.add(doorData, req);

      if (result.id) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withBody({
            statusCode: HttpStatus.CREATED,
            message: 'Usuário cadastrado com sucesso!',
          })
          .build();
      }
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException(
          {
            statusCode: 409,
            message: 'Já existe uma porta cadastrada com o mesmo nome',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Get('/findall')
  async findAll() {
    try {
      const result = await this.doorsService.findAll();
      return result;
    } catch (error) {
      throw new HttpException(
        { code: 400, message: error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/access')
  async access(@Body() accessData: AccessDoorDto) {
    try {
      const result = await this.doorsService.access(accessData);     
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.code,
          message: error,
        },
        error.code,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('/changestate')
  async changeState(@Body() stateData: StateDoorDto) {
    try {
      const result = await this.doorsService.changeState(stateData);     
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.code,
          message: error,
        },
        error.code,
      );
    }
  }
}
