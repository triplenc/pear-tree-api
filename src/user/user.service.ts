import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { User } from '../entities'
import { SignInDto, SignUpDto } from './dto'
import { SignInRO, SignUpRO } from './user.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private generateJwtToken(user: User) {
    // TODO(SeongJaeSong): 리프레시 토큰 적용
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

  async signUp({
    email,
    password,
    confirmPassword,
    nickname,
  }: SignUpDto): Promise<SignUpRO> {
    if (password !== confirmPassword) {
      throw new HttpException(
        `password and confirm password are doesn't match`,
        HttpStatus.BAD_REQUEST,
      )
    }

    const existUser = await this.userRepository.findOne({
      where: {
        email,
      },
    })

    if (existUser) {
      throw new HttpException('email duplicated', HttpStatus.CONFLICT)
    }

    const user = this.userRepository.create({
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      nickname,
    })

    await user.save()

    return { token: this.generateJwtToken(user) }
  }

  async signIn({ email, password }: SignInDto): Promise<SignInRO> {
    const user = await this.userRepository.findOne({
      select: ['id', 'password'],
      where: {
        email,
      },
    })

    if (!user) {
      throw new HttpException('incorrect email', HttpStatus.FORBIDDEN)
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword) {
      throw new HttpException('incorrect password', HttpStatus.FORBIDDEN)
    }

    return { token: this.generateJwtToken(user) }
  }
}
