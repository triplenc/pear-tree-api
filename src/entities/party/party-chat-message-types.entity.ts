import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../classification.entity'
import { PartyChat } from './party-chats.entity'

@Entity()
export class PartyChatMessageType extends ClassificationEntity {
  @OneToMany(() => PartyChat, (partyChat) => partyChat.messageType)
  chatList: PartyChat[]
}
