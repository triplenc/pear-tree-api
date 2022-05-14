import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../public/classification.entity'
import { PartyImage } from './party-image.entity'

@Entity()
export class PartyImageType extends ClassificationEntity {
  @OneToMany(() => PartyImage, (partyImage) => partyImage.partyImageType)
  partyImages: PartyImage[]
}
