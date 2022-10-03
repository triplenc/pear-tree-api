import { Column, Entity, OneToMany } from 'typeorm'
import { IMAGE_URL_LENGTH } from '../../common/constants'
import { ClassificationEntity } from '../classification.entity'
import { Party } from '../party/parties.entity'

@Entity({ name: 'categories', synchronize: false })
export class Category extends ClassificationEntity {
  @Column({ length: IMAGE_URL_LENGTH })
  imageUrl: string

  @OneToMany(() => Party, (party) => party.category)
  partyList: Party[]
}
