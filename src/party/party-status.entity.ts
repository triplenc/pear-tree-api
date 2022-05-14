import { Entity } from 'typeorm'
import { ClassificationEntity } from '../public/classification.entity'

@Entity()
export class PartyStatus extends ClassificationEntity {}
