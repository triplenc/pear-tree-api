import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { DefaultEntity } from '../default.entity'
import { Bank } from './banks.entity'
import { User } from './users.entity'

@Entity()
export class UserAccount extends DefaultEntity {
  @Column({ length: 10 })
  accountName: string

  @Column({ length: 30 })
  accountNumber: string

  @OneToOne(() => User, (user) => user.account)
  user: User

  @ManyToOne(() => Bank, (bank) => bank.userAccountList)
  bank: Bank
}
