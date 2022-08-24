import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm'
import { User } from '../user/users.entity'
import { Party } from './parties.entity'
import { ParticipantStatus } from './party-participant-statuses.entity'

@Entity()
export class PartyParticipant extends BaseEntity {
  @Column()
  unseenMessageCount: number

  @ManyToOne(() => User, (user) => user.partyParticipantList)
  user: User

  @ManyToOne(() => Party, (party) => party.partyParticipantList)
  party: Party

  @ManyToOne(() => ParticipantStatus, (status) => status.partyParticipantList)
  status: ParticipantStatus
}
