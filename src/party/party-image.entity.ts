import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PartyImageType } from './party-image-type.entity'
import { Party } from './party.entity'

@Entity()
export class PartyImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  imageUrl: string

  @ManyToOne(() => Party, (party) => party.images)
  party: Party

  @ManyToOne(
    () => PartyImageType,
    (partyImageType) => partyImageType.partyImages,
  )
  partyImageType: PartyImageType
}
