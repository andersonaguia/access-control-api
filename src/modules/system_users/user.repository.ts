import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { CredentialsDTO } from "src/core/auth/dto/credentials.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async checkCredentials(credentials: CredentialsDTO): Promise<UserEntity> {
    const { email } = credentials;
    return await this.findOne({
      where: { email: email },
    });
  }

  async createUser(newUser: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { fullName, email, password, occupation, role } = newUser;

        const user = new UserEntity();
        user.fullName = fullName;
        user.email = email;
        user.occupation = occupation;
        user.role = role;
        user.salt = await bcrypt.genSalt(12);
        user.password = await this.hashPassword(password, user.salt);

        const apartmentSaved = await this.save(user);
        resolve(apartmentSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
