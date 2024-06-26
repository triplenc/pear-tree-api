import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../classification.entity'
import { PartyParticipant } from './party-participants.entity'

@Entity({ name: 'partyParticipantStatuses', synchronize: false })
export class ParticipantStatus extends ClassificationEntity {
  @OneToMany(
    () => PartyParticipant,
    (partyParticipant) => partyParticipant.status,
  )
  partyParticipantList: PartyParticipant[]
}
