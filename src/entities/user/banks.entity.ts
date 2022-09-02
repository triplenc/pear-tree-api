import { Column, Entity, OneToMany } from 'typeorm'
import { ClassificationEntity } from '../classification.entity'
import { IMAGE_URL_LENGTH } from '../constants'
import { UserAccount } from './user-accounts.entity'

@Entity({ name: 'banks' })
export class Bank extends ClassificationEntity {
  @Column({ length: IMAGE_URL_LENGTH })
  imageUrl: string

  @OneToMany(() => UserAccount, (userAccount) => userAccount.bank)
  userAccountList: UserAccount[]
}
