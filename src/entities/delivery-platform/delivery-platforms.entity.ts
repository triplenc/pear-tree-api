import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../classification.entity'
import { Party } from '../party/parties.entity'

@Entity({ name: 'deliveryPlatforms', synchronize: false })
export class DeliveryPlatform extends ClassificationEntity {
  @OneToMany(() => Party, (party) => party.deliveryPlatform)
  partyList: Party[]
}
