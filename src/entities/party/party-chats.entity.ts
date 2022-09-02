import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IMAGE_URL_LENGTH } from '../constants'
import { User } from '../user/users.entity'
import { Party } from './parties.entity'
import { PartyChatImageType } from './party-chat-image-types.entity'
import { PartyChatMessageType } from './party-chat-message-types.entity'

@Entity({ name: 'partyChats' })
export class PartyChat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  message: string

  @Column({ length: IMAGE_URL_LENGTH })
  imageUrl: string

  @ManyToOne(() => Party, (party) => party.chatList)
  party: Party

  @ManyToOne(
    () => PartyChatMessageType,
    (partyChatMessageType) => partyChatMessageType.chatList,
  )
  messageType: PartyChatMessageType

  @ManyToOne(
    () => PartyChatImageType,
    (partyChatImageType) => partyChatImageType.imageList,
  )
  imageType: PartyChatImageType

  @ManyToOne(() => User, (user) => user.partyChatList)
  user: User
}
