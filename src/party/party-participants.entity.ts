import { BaseEntity, Entity, ManyToOne } from 'typeorm'
import { User } from '../users/users.entity'
import { ParticipantStatus } from './participant-statuses.entity'
import { Party } from './parties.entity'

@Entity()
export class PartyParticipant extends BaseEntity {
  @ManyToOne(() => User, (user) => user.partyParticipants)
  user: User

  @ManyToOne(() => Party, (party) => party.partyParticipants)
  party: Party

  @ManyToOne(() => ParticipantStatus, (status) => status.partyParticipants)
  status: ParticipantStatus
}
