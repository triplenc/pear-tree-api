import { Column, Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../classification.entity'
import { IMAGE_URL_LENGTH } from '../constants'
import { Party } from '../party/parties.entity'

@Entity()
export class Category extends ClassificationEntity {
  @Column({ length: IMAGE_URL_LENGTH })
  imageUrl: string

  @OneToMany(() => Party, (party) => party.category)
  partyList: Party[]
}
