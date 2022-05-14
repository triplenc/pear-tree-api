import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
