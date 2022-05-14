import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../public/classification.entity'
import { PartyParticipant } from './party-participant.entity'

@Entity()
export class ParticipantStatus extends ClassificationEntity {
  @OneToMany(
    () => PartyParticipant,
    (partyParticipant) => partyParticipant.status,
  )
  partyParticipants: PartyParticipant[]
}
