import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CredentialsDTO } from '../dto/credentials.dto';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { CreateUserDto } from 'src/modules/system_users/dto/create-user.dto';
import { TokenDTO } from '../dto/token.dto';
import { UserRepository } from 'src/modules/system_users/user.repository';
import { UserEntity } from 'src/modules/system_users/entities/user.entity';
import { UpdatePasswordDTO } from '../dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(userData: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        if (userData.password != userData.passwordConfirmation) {
          resolve(null);
        }

        const userCreated = await this.userRepository.createUser(userData);

        delete userCreated.password;
        delete userCreated.salt;
        resolve(userCreated);
      } catch (error) {
        reject(error);
      }
    });
  }

  async signIn(credentials: CredentialsDTO): Promise<TokenDTO> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.checkCredentials(credentials);
        if (user === null) {
          resolve(null);
        }
        const firstName = user.fullName.split(' ');

        const jwtPayload = {
          id: user.id,
          firstName: firstName[0],
          occupation: user.occupation,
          email: user.email,
          role: user.role,
        };
        const token = new TokenDTO();
        token.token = this.jwtService.sign(jwtPayload);
        resolve(token);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async checkCredentials(credentials: CredentialsDTO) {
    const { password } = credentials;
    const user = await this.userRepository.checkCredentials(credentials);

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({
          code: 401,
          detail: 'JWT expired.',
        });
      }
    });
  }

  decodedToken(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }

  async changePassword(data: ChangePasswordDTO): Promise<number> {
    const { email, oldPassword, newPassword } = data;
    return new Promise(async (resolve, reject) => {
      try {
        const credentials: CredentialsDTO = new CredentialsDTO();
        credentials.email = email;
        credentials.password = oldPassword;

        const user = await this.checkCredentials(credentials);

        if (user === null) {
          resolve(null);
        }
        const dataToUpdate = new UpdatePasswordDTO();
        dataToUpdate.password = await this.hashPassword(newPassword, user.salt);
        dataToUpdate.updatedAt = new Date();
        user.salt = await bcrypt.genSalt(12);

        const success = await this.updateUserPassword(user.id, dataToUpdate);
        resolve(success);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  updateUserPassword(
    id: number,
    dataToUpdate: UpdatePasswordDTO,
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const { affected } = await this.userRepository.update(
          { id: id },
          dataToUpdate,
        );
        if (affected === 0) {
          resolve(affected);
        }
        resolve(affected);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}