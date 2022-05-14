import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Category } from '../category/category.entity'
import { DeliveryPlatform } from '../delivery-platform/delivery-platform.entity'
import { PartyChat } from './party-chat.entity'
import { PartyImage } from './party-image.entity'
import { PartyParticipant } from './party-participant.entity'
import { PartyStatus } from './party-status.entity'

@Entity()
export class Party extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  shopName: string

  @Column({ length: 40 })
  pickUpLatitude: string

  @Column({ length: 40 })
  pickUpLongitude: string

  @Column({ length: 200 })
  pickUpAddress: string

  @Column({ type: 'datetime' })
  participateDeadline: Date

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
  partyParticipants: PartyParticipant[]

  @OneToOne(() => Category)
  category: Category

  @ManyToOne(() => PartyStatus, (partyStatus) => partyStatus.parties)
  status: PartyStatus

  @OneToMany(() => PartyChat, (partyChat) => partyChat.party)
  chats: PartyChat[]

  @ManyToOne(
    () => DeliveryPlatform,
    (deliveryPlatform) => deliveryPlatform.parties,
  )
  deliveryPlatform: DeliveryPlatform

  @OneToMany(() => PartyImage, (partyImage) => partyImage.party)
  images: PartyImage[]
}
