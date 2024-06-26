import { Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../classification.entity'
import { PartyChat } from './party-chats.entity'

@Entity({ name: 'partyChatImageTypes', synchronize: false })
export class PartyChatImageType extends ClassificationEntity {
  @OneToMany(() => PartyChat, (partyChat) => partyChat.imageType)
  imageList: PartyChat[]
}
