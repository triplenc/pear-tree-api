import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../classification.entity'
import { Party } from './parties.entity'

@Entity({ name: 'partyStatuses', synchronize: false })
export class PartyStatus extends ClassificationEntity {
  @OneToMany(() => Party, (party) => party.status)
  partyList: Party[]
}
