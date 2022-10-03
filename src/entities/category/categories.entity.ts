import { Column, Entity, OneToMany } from 'typeorm'
import { IMAGE_URL_LENGTH } from '../../common/constants'
import { ClassificationEntity } from '../classification.entity'
import { Party } from '../party/parties.entity'

@Entity({ name: 'categories' })
export class Category extends ClassificationEntity {
  @Column({ length: IMAGE_URL_LENGTH })
  imageUrl: string

  @Column()
  priority: number

  @OneToMany(() => Party, (party) => party.category)
  partyList: Party[]
}
