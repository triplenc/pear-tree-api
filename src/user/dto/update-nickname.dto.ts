import { IsNotEmpty, Length } from 'class-validator'

export class UpdateNicknameDto {
  @IsNotEmpty()
  @Length(2, 8)
  readonly nickname: string
}
