import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { DefaultEntity } from '../default.entity'
import { Party } from './parties.entity'

@Entity({ name: 'lastMessages' })
export class LastMessage extends DefaultEntity {
  @Column({ length: 500 })
  message: string

  @OneToOne(() => Party, (party) => party.lastMessage)
  @JoinColumn()
  party: Party
}
