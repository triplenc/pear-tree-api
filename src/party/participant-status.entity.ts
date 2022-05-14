import { Entity } from 'typeorm'
import { ClassificationEntity } from '../public/classification.entity'

@Entity()
export class ParticipantStatus extends ClassificationEntity {}
