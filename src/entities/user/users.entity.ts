import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { ADDRESS_LENGTH } from '../../common/constants'
import { DefaultEntity } from '../default.entity'
import { Party } from '../party/parties.entity'
import { PartyChat } from '../party/party-chats.entity'
import { PartyParticipant } from '../party/party-participants.entity'
import { UserAccount } from './user-accounts.entity'

// TODO(SeongJaeSong): 본인인증 도입 후 phone, name, sex non-nullable로 변경
@Entity({ name: 'users' })
export class User extends DefaultEntity {
  @Column({ length: 8 })
  nickname: string

  @Column({ length: 11, unique: true, nullable: true })
  phone: string

  @Column({ length: 10, nullable: true })
  name: string

  @Column({ nullable: true })
  sex: boolean

  @Column({ length: ADDRESS_LENGTH, nullable: true })
  address: string

  @Column({ length: ADDRESS_LENGTH, nullable: true })
  extraAddress: string

  @Column({ length: 40, nullable: true })
  latitude: string

  @Column({ length: 40, nullable: true })
  longitude: string

  @Column({ length: 150, nullable: true })
  email: string

  @Column({ nullable: true })
  password: string

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
