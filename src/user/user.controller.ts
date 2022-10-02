import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { SuccessRO } from '../common/common.interface'
import { ValidationPipe } from '../common/validation.pipe'
import { User as UserEntity } from '../entities'
import { SignInDto, SignUpDto, UpdateAddressDto } from './dto'
import { UpdateNicknameDto } from './dto/update-nickname.dto'
import { User } from './user.decorator'
import { SignInRO, SignUpRO } from './user.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<SignUpRO> {
    return await this.userService.signUp(signUpDto)
  }

  @Post('sign-in')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<SignInRO> {
    return await this.userService.signIn(signInDto)
  }

  @Put('address')
  @UseGuards(AuthGuard)
  async updateAddress(
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
    @User() user: UserEntity,
  ): Promise<SuccessRO> {
    return await this.userService.updateAddress(updateAddressDto, user)
  }

  @Put('nickname')
  @UseGuards(AuthGuard)
  async updateNickname(
    @Body(ValidationPipe) updateNicknameDto: UpdateNicknameDto,
    @User() user: UserEntity,
  ): Promise<SuccessRO> {
    return await this.userService.updateNickname(updateNicknameDto, user)
  }
}
