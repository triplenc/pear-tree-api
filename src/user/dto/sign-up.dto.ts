import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsNotEmpty()
  readonly password: string

  @IsNotEmpty()
  readonly confirmPassword: string

  @IsNotEmpty()
  readonly nickname: string
}
