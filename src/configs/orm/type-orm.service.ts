import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_SCHEMA'),
      entities: ['dist/**/**/*.entity{.js,.ts}'],
      timezone: '+09:00',
      // TODO(SeongJaeSong): 개발 후 synchronize, dropSchema 옵션 제거
      synchronize: Boolean(Number(process.env.SYNC)),
      // dropSchema: Boolean(Number(process.env.SYNC)),
      logging: true,
    }
  }
}
