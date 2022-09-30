import { Body, Controller, Post } from '@nestjs/common'
import { SignInDto, SignUpDto } from './dto'
import { SignInRO, SignUpRO } from './user.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpRO> {
    return await this.userService.signUp(signUpDto)
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInRO> {
    return await this.userService.signIn(signInDto)
  }
}
