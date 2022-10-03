import {
  IsIn,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  Length,
} from 'class-validator'

export class CreatePartyDto {
  @IsNotEmpty()
  @IsInt()
  readonly categoryId: number

  @IsNotEmpty()
  @IsInt()
  readonly deliveryPlatformId: number

  @IsNotEmpty()
  @Length(1, 50)
  readonly shopName: string

  @IsNotEmpty()
  readonly deliveryPlatformUrl: string

  @IsNotEmpty()
  readonly address: string

  @IsNotEmpty()
  readonly extraAddress: string

  @IsNotEmpty()
  @IsLatitude()
  readonly latitude: string

  @IsNotEmpty()
  @IsLongitude()
  readonly longitude: string

  @IsNotEmpty()
  @IsInt()
  @IsIn([2, 3, 4])
  readonly participantLimit: 2 | 3 | 4

  @IsNotEmpty()
  @IsInt()
  @IsIn([15, 30, 45, 60])
  readonly deadline: 15 | 30 | 45 | 60
}
