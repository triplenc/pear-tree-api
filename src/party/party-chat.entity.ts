import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Party } from './party.entity'

@Entity()
export class PartyChat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  message: string

  @ManyToOne(() => Party, (party) => party.chats)
  party: Party
}
