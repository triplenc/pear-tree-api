import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Category } from '../category/category.entity'
import { PartyParticipant } from './party-participant.entity'

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
}
