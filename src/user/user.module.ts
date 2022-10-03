import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthMiddleware } from '../auth/auth.middleware'
import { User } from '../entities'
import { Bank } from '../entities/user/banks.entity'
import { UserAccount } from '../entities/user/user-accounts.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Bank, UserAccount])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('/')
  }
}
