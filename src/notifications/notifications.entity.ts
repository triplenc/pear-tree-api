import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../users/users.entity'
import { NotificationType } from './notification-types.entity'

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 30 })
  title: string

  @Column({ length: 100 })
  content: string

  @ManyToOne(() => User, (user) => user.notifications)
  user: User

  @ManyToOne(() => NotificationType, (type) => type.notifications)
  type: NotificationType
}
