import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Party } from './parties.entity'
import { PartyImageType } from './party-image-types.entity'

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
