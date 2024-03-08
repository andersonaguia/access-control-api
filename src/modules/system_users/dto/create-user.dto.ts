import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { UserRole } from "../enum/user.role";
import { Match } from "src/core/constraints/match.decorator";

export class CreateUserDto {
  @IsNotEmpty({ message: "fullName cannot be empty" })
  @IsString({ message: "fullName must be a string" })
  readonly fullName: string;

  @IsNotEmpty({ message: "email cannot be empty" })
  @IsEmail(
    {},
    {
      message: "email must be a valid email",
    }
  )
  readonly email: string;

  @IsString({ message: "password must be a string" })
  @IsNotEmpty({ message: "password cannot be empty" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      "The password must contain at least 8 characters, including at least one letter, one number and one special character",
  })
  readonly password: string;

  @Match("password", { message: "passwords do not match" })
  @IsNotEmpty({ message: "passwordConfirmation cannot be empty" })
  readonly passwordConfirmation: string;

  @IsNotEmpty()
  @IsString()
  readonly occupation: string;

  readonly role: UserRole;
}
