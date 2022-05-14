import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PartyChatMessageType } from './party-chat-message-type.entity'
import { Party } from './party.entity'

@Entity()
export class PartyChat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  message: string

  @ManyToOne(() => Party, (party) => party.chats)
  party: Party

  @ManyToOne(
    () => PartyChatMessageType,
    (partyChatMessageType) => partyChatMessageType.partyChats,
  )
  messageType: PartyChatMessageType
}
