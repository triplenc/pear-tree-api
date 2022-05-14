import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../public/classification.entity'
import { Notification } from './notification.entity'

@Entity()
export class NotificationType extends ClassificationEntity {
  @OneToMany(() => Notification, (notification) => notification.type)
  notifications: Notification[]
}
