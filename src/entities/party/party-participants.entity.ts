import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../user/users.entity'
import { Party } from './parties.entity'
import { ParticipantStatus } from './party-participant-statuses.entity'

@Entity({ name: 'partyParticipants' })
export class PartyParticipant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  unseenMessageCount: number

  @ManyToOne(() => User, (user) => user.partyParticipantList)
  user: User

  @ManyToOne(() => Party, (party) => party.partyParticipantList)
  party: Party

  @ManyToOne(() => ParticipantStatus, (status) => status.partyParticipantList)
  status: ParticipantStatus
}
