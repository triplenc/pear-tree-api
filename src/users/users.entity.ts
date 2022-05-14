import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserAddress } from './user-addresses.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 8 })
  nickname: string

  @Column({ length: 11, unique: true })
  phone: string

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[]
}
