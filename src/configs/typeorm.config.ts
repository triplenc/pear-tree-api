import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.RDS_HOST,
  port: process.env.RDS_PORT || 3306,
  database: process.env.RDS_SCHEMA,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false,
}
