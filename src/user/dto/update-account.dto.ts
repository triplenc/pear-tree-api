import { IsNotEmpty, IsNumberString, Length } from 'class-validator'

export class UpdateAccountDto {
  @IsNotEmpty()
  @Length(2, 10)
  readonly accountName: string

  @IsNotEmpty()
  @IsNumberString()
  @Length(5, 30)
  readonly accountNumber: string

  @IsNotEmpty()
  @Length(3, 3)
  readonly bankCode: string
}
