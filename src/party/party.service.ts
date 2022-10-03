import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as dayjs from 'dayjs'
import { Not, Repository } from 'typeorm'
import { SuccessRO } from '../common/common.interface'
import { SUCCESS_RO } from '../common/constants'
import { Category, Party, User } from '../entities'
import { DeliveryPlatform } from '../entities/delivery-platform/delivery-platforms.entity'
import { PartyStatus } from '../entities/party/party-statuses.entity'
import { CreatePartyDto } from './dto'

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(DeliveryPlatform)
    private readonly deliveryPlatfromRepository: Repository<DeliveryPlatform>,
    @InjectRepository(PartyStatus)
    private readonly partyStatusRepository: Repository<PartyStatus>,
  ) {}

  async createParty(
    {
      categoryId,
      deliveryPlatformId,
      shopName,
      deliveryPlatformUrl,
      address,
      extraAddress,
      latitude,
      longitude,
      participantLimit,
      deadline,
    }: CreatePartyDto,
    user: User,
  ): Promise<SuccessRO> {
    const hostedParties = await this.partyRepository.find({
      relations: {
        host: true,
        status: true,
      },
      where: {
        host: {
          id: user.id,
        },
        status: {
          code: Not('done'),
        },
      },
    })

    if (hostedParties.length) {
      throw new HttpException(
        `exist already hosted party that wasn't done`,
        HttpStatus.CONFLICT,
      )
    }

    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND)
    }

    const deliveryPlatform = await this.deliveryPlatfromRepository.findOne({
      where: {
        id: deliveryPlatformId,
      },
    })

    if (!deliveryPlatform) {
      throw new HttpException(
        'delivery platform not found',
        HttpStatus.NOT_FOUND,
      )
    }

    const waitGuestOrderPartyStatus = await this.partyStatusRepository.findOne({
      where: {
        code: 'wait-guest-order',
      },
    })

    if (!waitGuestOrderPartyStatus) {
      throw new HttpException('party status not found', HttpStatus.NOT_FOUND)
    }

    const party = this.partyRepository.create({
      shopName,
      deliveryPlatformUrl,
      address,
      extraAddress,
      latitude,
      longitude,
      participantLimit,
      deadline: dayjs().add(deadline, 'minute').endOf('minute').format(),
    })

    party.host = Promise.resolve(user)
    party.category = Promise.resolve(category)
    party.deliveryPlatform = Promise.resolve(deliveryPlatform)
    party.status = Promise.resolve(waitGuestOrderPartyStatus)
    await party.save()

    return SUCCESS_RO
  }
}
