import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { TypeOrmConfigModule } from './configs/orm/type-orm.module'
import { TypeOrmConfigService } from './configs/orm/type-orm.service'
import { PartyModule } from './party/party.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    PartyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
