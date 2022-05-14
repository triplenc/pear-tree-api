import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../public/classification.entity'
import { Party } from './party.entity'

@Entity()
export class PartyStatus extends ClassificationEntity {
  @OneToMany(() => Party, (party) => party.status)
  parties: Party[]
}
