import { Entity, OneToMany } from 'typeorm'
import { Party } from '../party/parties.entity'
import { ClassificationEntity } from '../public/classification.entity'

@Entity()
export class DeliveryPlatform extends ClassificationEntity {
  @OneToMany(() => Party, (party) => party.deliveryPlatform)
  parties: Party[]
}
