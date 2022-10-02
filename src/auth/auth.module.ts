import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entities/user/users.entity'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
