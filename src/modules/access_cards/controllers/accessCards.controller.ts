import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AccessCardsService } from '../services/accessCards.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { UserRole } from 'src/modules/system_users/enum/user.role';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { CreateAccessCardDto } from '../dto/create.dto';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

@Controller('accesscards')
export class AccessCardsController {
  constructor(private readonly accessCardsService: AccessCardsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/new')
  async add(@Body() accessCardData: CreateAccessCardDto, @Request() req: any) {
    try {
      const result = await this.accessCardsService.add(accessCardData, req);
      if (result.id) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withHeaders({ Location: `/accesscards/${result.id}` })
          .withBody({
            message: 'Cartão cadastrado com sucesso',
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
      const result = await this.accessCardsService.findAll();
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
      const result = await this.accessCardsService.findById(+id);
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
