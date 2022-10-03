import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { SuccessRO } from '../common/common.interface'
import { SUCCESS_RO } from '../common/constants'
import { User } from '../entities'
import { Bank } from '../entities/user/banks.entity'
import { UserAccount } from '../entities/user/user-accounts.entity'
import { SignInDto, SignUpDto, UpdateAddressDto } from './dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { UpdateNicknameDto } from './dto/update-nickname.dto'
import { SignInRO, SignUpRO } from './user.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
  ) {}

  private generateJwtToken(user: User) {
    // TODO(SeongJaeSong): 리프레시 토큰 적용
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }

    return user
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

  async updateAddress(
    { address, extraAddress, longitude, latitude }: UpdateAddressDto,
    user: User,
  ): Promise<SuccessRO> {
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        address,
        extraAddress,
        longitude,
        latitude,
      },
    )

    return SUCCESS_RO
  }

  async updateNickname(
    { nickname }: UpdateNicknameDto,
    user: User,
  ): Promise<SuccessRO> {
    await this.userRepository.update(
      {
        id: user.id,
      },
      { nickname },
    )

    return SUCCESS_RO
  }

  async updateAccount(
    { bankCode, accountNumber, accountName }: UpdateAccountDto,
    user: User,
  ): Promise<SuccessRO> {
    const bank = await this.bankRepository.findOne({
      where: {
        code: bankCode,
      },
    })

    if (!bank) {
      throw new HttpException('bank not found', HttpStatus.NOT_FOUND)
    }

    const userAccount =
      (await user.account) ?? this.userAccountRepository.create()

    userAccount.accountNumber = accountNumber
    userAccount.accountName = accountName
    userAccount.bank = bank
    await userAccount.save()

    user.account = userAccount
    await user.save()

    return SUCCESS_RO
  }
}
