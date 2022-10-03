import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { SuccessRO } from '../common/common.interface'
import { ValidationPipe } from '../common/validation.pipe'
import { User as UserEntity } from '../entities'
import { User } from '../user/user.decorator'
import { CreatePartyDto } from './dto'
import { GetHostedPartyListRO } from './party.interface'
import { PartyService } from './party.service'

@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  // 파티 생성
  @Post()
  @UseGuards(AuthGuard)
  async createParty(
    @Body(ValidationPipe) createPartyDto: CreatePartyDto,
    @User() user: UserEntity,
  ): Promise<SuccessRO> {
    return await this.partyService.createParty(createPartyDto, user)
  }

  // 호스팅 파티 내역 조회
  @Get('hosted')
  @UseGuards(AuthGuard)
  async getHostedPartyList(
    @User() user: UserEntity,
  ): Promise<GetHostedPartyListRO[]> {
    return await this.partyService.getHostedPartyList(user)
  }
}
