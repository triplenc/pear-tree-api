import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Party } from './parties.entity'
import { PartyChatMessageType } from './party-chat-message-types.entity'

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
