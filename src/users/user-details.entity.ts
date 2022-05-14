import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { User } from './users.entity'

@Entity()
export class UserDetail extends BaseEntity {
  @OneToOne(() => User)
  @PrimaryColumn()
  @JoinColumn()
  userId: User

  @Column({ length: 10 })
  name: string

  @Column()
  sex: boolean
}
