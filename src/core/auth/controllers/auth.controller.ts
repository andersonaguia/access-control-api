import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { isNumber } from "class-validator";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { AuthService } from "../services/auth.service";
import { ChangePasswordDTO } from "../dto/change-password.dto";
import { CredentialsDTO } from "../dto/credentials.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CreateUserDto } from "src/modules/system_users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      const result = await this.authService.signUp(createUserDto);
      if (result === null) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.UNPROCESSABLE_ENTITY)
          .withBody({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: "Senhas não conferem",
          })
          .build();
      } else if (result.id) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withBody({
            statusCode: HttpStatus.CREATED,
            message: "Usuário cadastrado com sucesso!",
          })
          .build();
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CONFLICT)
          .withBody({
            statusCode: 409,
            detail: "Existe um usuário cadastrado com o mesmo e-mail",
          })
          .build();
      }
      return new NestResponseBuilder()
        .withStatus(HttpStatus.BAD_REQUEST)
        .withBody({
          statusCode: error.code,
          detail: error.sqlMessage,
        })
        .build();
    }
  }

  @Post("/signin")
  async signIn(
    @Body(ValidationPipe)
    credentialsDto: CredentialsDTO
  ) {    
    const result = await this.authService.signIn(credentialsDto);
    if (result === null) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.UNAUTHORIZED)
        .withBody({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: "Usuário ou senha inválidos!",
        })
        .build();
    } else if (result.token) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withBody(result)
        .build();
    }
    return new NestResponseBuilder()
      .withStatus(HttpStatus.BAD_REQUEST)
      .withBody(result)
      .build();
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/changepassword")
  async changePassword(@Body() data: ChangePasswordDTO) {
    const result = await this.authService.changePassword(data);
    if (result === null) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.UNAUTHORIZED)
        .withBody({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: "E-mail ou senha antiga incorretos!",
        })
        .build();
    } else if (isNumber(result)) {
      if (result > 0) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.OK)
          .withBody({
            statusCode: HttpStatus.OK,
            message: "Senha alterada com sucesso!",
          })
          .build();
      } else {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.NOT_FOUND)
          .withBody({
            statusCode: 404,
            detail: "Id não encontrado ou indisponível para atualização",
          })
          .build();
      }
    }
    return new NestResponseBuilder()
      .withStatus(HttpStatus.BAD_REQUEST)
      .withBody(result)
      .build();
  }
}
