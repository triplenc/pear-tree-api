import { Column, Entity, OneToOne } from 'typeorm'
import { DefaultEntity } from '../default.entity'
import { Party } from './parties.entity'

@Entity()
export class LastMessage extends DefaultEntity {
  @Column({ length: 500 })
  message: string

  @OneToOne(() => Party, (party) => party.lastMessage)
  party: Party
}
