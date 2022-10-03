import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { DefaultEntity } from '../default.entity'
import { Bank } from './banks.entity'
import { User } from './users.entity'

@Entity({ name: 'userAccounts' })
export class UserAccount extends DefaultEntity {
  @Column({ length: 10 })
  accountName: string

  @Column({ length: 30 })
  accountNumber: string

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn()
  user: Promise<User>

  @ManyToOne(() => Bank, (bank) => bank.userAccountList)
  bank: Promise<Bank>
}
