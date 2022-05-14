import { BaseEntity, Entity, ManyToOne } from 'typeorm'
import { User } from '../users/users.entity'
import { Party } from './party.entity'

@Entity()
export class PartyParticipant extends BaseEntity {
  @ManyToOne(() => User, (user) => user.partyParticipants)
  user: User

  @ManyToOne(() => Party, (party) => party.partyParticipants)
  party: Party
}
