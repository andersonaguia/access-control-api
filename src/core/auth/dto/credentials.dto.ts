import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CredentialsDTO {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: "email must be a valid email",
    }
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
