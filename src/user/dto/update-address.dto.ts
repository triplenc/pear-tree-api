import { IsLatitude, IsLongitude, IsNotEmpty, Length } from 'class-validator'
import { ADDRESS_LENGTH } from '../../common/constants'

export class UpdateAddressDto {
  @IsNotEmpty()
  @Length(0, ADDRESS_LENGTH)
  readonly address: string

  @Length(0, ADDRESS_LENGTH)
  readonly extraAddress: string

  @IsNotEmpty()
  @IsLatitude()
  readonly latitude: string

  @IsNotEmpty()
  @IsLongitude()
  readonly longitude: string
}
