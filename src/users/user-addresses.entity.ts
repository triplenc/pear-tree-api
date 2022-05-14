import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './users.entity'

@Entity()
export class UserAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  address: string

  @Column({ length: 100 })
  extraAddress: string

  @Column({ length: 40 })
  latitude: string

  @Column({ length: 40 })
  longitude: string

  @Column()
  isRecent: boolean

  @ManyToOne(() => User, (user) => user.addresses)
  user: User
}
