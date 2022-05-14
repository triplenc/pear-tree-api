import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Notification } from '../notifications/notifications.entity'
import { PartyParticipant } from '../party/party-participants.entity'
import { UserAddress } from './user-addresses.entity'
import { UserDetail } from './user-details.entity'

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

  @OneToOne(() => UserDetail)
  @JoinColumn()
  detail: UserDetail

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[]

  @OneToMany(
    () => PartyParticipant,
    (partyParticipant) => partyParticipant.user,
  )
  partyParticipants: PartyParticipant[]
}
