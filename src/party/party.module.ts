import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { Category, DeliveryPlatform, Party, PartyStatus } from '../entities'
import { PartyController } from './party.controller'
import { PartyService } from './party.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Party, DeliveryPlatform, Category, PartyStatus]),
    AuthModule,
  ],
  controllers: [PartyController],
  providers: [PartyService],
})
export class PartyModule {}
