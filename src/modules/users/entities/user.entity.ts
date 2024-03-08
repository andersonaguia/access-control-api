import { Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRole } from "../enum/user.role";
import { BaseEntity } from "src/core/entities";

@Entity({ name: "system_users" })
export class UserEntity extends BaseEntity {
  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({type: "boolean", nullable: false, default: true})
  active: boolean;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
