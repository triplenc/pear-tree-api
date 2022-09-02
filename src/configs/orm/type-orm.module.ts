import { Module } from '@nestjs/common'
import { TypeOrmConfigService } from './type-orm.service'

@Module({
  providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
