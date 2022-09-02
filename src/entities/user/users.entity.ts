import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { ADDRESS_LENGTH } from '../constants'
import { DefaultEntity } from '../default.entity'
import { Party } from '../party/parties.entity'
import { PartyChat } from '../party/party-chats.entity'
import { PartyParticipant } from '../party/party-participants.entity'
import { UserAccount } from './user-accounts.entity'

@Entity({ name: 'users' })
export class User extends DefaultEntity {
  @Column({ length: 8 })
  nickname: string

  @Column({ length: 11, unique: true })
  phone: string

  @Column({ length: 10 })
  name: string

  @Column()
  sex: boolean

  @Column({ length: ADDRESS_LENGTH, nullable: true })
  address: string

  @Column({ length: ADDRESS_LENGTH, nullable: true })
  extraAddress: string

  @Column({ length: 40, nullable: true })
  latitude: string

  @Column({ length: 40, nullable: true })
  longitude: string

  @OneToOne(() => UserAccount, (userAccount) => userAccount.user)
  account: UserAccount

  @OneToMany(
    () => PartyParticipant,
    (partyParticipant) => partyParticipant.user,
  )
  partyParticipantList: PartyParticipant[]

  @OneToMany(() => Party, (party) => party.host)
  hostedPartyList: Party[]

  @OneToMany(() => PartyChat, (partyChat) => partyChat.user)
  partyChatList: PartyChat[]
}
