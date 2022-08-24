import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Category } from '../category/categories.entity'
import { ADDRESS_LENGTH } from '../constants'
import { DefaultEntity } from '../default.entity'
import { DeliveryPlatform } from '../delivery-platform/delivery-platforms.entity'
import { User } from '../user/users.entity'
import { LastMessage } from './last-messages.entity'
import { PartyChat } from './party-chats.entity'
import { PartyParticipant } from './party-participants.entity'
import { PartyStatus } from './party-statuses.entity'

@Entity()
export class Party extends DefaultEntity {
  @Column({ length: 50 })
  shopName: string

  @Column({ length: 40 })
  latitude: string

  @Column({ length: 40 })
  longitude: string

  @Column({ length: ADDRESS_LENGTH })
  address: string

  @Column({ length: ADDRESS_LENGTH })
  extraAddress: string

  @Column({ type: 'datetime' })
  deadline: Date

  @Column()
  participantLimit: number

  @Column()
  originalDeliveryFee: number

  @Column({ nullable: true })
  guestDeliveryFee: number

  @Column({ nullable: true })
  hostDeliveryFee: number

  @OneToMany(
    () => PartyParticipant,
    (partyParticipant) => partyParticipant.party,
  )
  partyParticipantList: PartyParticipant[]

  @ManyToOne(() => Category, (category) => category.partyList)
  category: Category

  @ManyToOne(() => PartyStatus, (partyStatus) => partyStatus.partyList)
  status: PartyStatus

  @OneToMany(() => PartyChat, (partyChat) => partyChat.party)
  chatList: PartyChat[]

  @ManyToOne(
    () => DeliveryPlatform,
    (deliveryPlatform) => deliveryPlatform.partyList,
  )
  deliveryPlatform: DeliveryPlatform

  @OneToOne(() => LastMessage, (lastMessage) => lastMessage.party)
  lastMessage: LastMessage

  @ManyToOne(() => User, (user) => user.hostedPartyList)
  host: User
}
