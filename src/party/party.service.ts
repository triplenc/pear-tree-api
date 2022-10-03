import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as dayjs from 'dayjs'
import { Not, Repository } from 'typeorm'
import { SuccessRO } from '../common/common.interface'
import { SUCCESS_RO } from '../common/constants'
import {
  Category,
  DeliveryPlatform,
  Party,
  PartyStatus,
  User,
} from '../entities'
import { CreatePartyDto } from './dto'
import { GetHostedPartyListRO } from './party.interface'

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

    party.host = user
    party.category = category
    party.deliveryPlatform = deliveryPlatform
    party.status = waitGuestOrderPartyStatus
    await party.save()

    return SUCCESS_RO
  }

  async getHostedPartyList(user: User): Promise<GetHostedPartyListRO[]> {
    // TODO(SeongJaeSong): Lazy loading 방식으로 변경
    const parties = await this.partyRepository.find({
      select: {
        id: true,
        deadline: true,
        latitude: true,
        longitude: true,
        participantLimit: true,
        shopName: true,
        address: true,
        extraAddress: true,
        status: {
          id: true,
          code: true,
          name: true,
        },
        partyParticipantList: {
          id: true,
          status: {
            id: true,
            code: true,
            name: true,
          },
          user: {
            id: true,
            nickname: true,
          },
        },
      },
      where: {
        host: {
          id: user.id,
        },
      },
      relations: {
        status: true,
        partyParticipantList: {
          status: true,
          user: true,
        },
      },
    })

    return parties
  }
}
