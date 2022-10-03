import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { SuccessRO } from '../common/common.interface'
import { ValidationPipe } from '../common/validation.pipe'
import { User as UserEntity } from '../entities'
import { User } from '../user/user.decorator'
import { CreatePartyDto } from './dto'
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
}
