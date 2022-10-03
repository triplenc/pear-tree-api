import { Column, Entity, OneToMany } from 'typeorm'
import { IMAGE_URL_LENGTH } from '../../common/constants'
import { ClassificationEntity } from '../classification.entity'
import { UserAccount } from './user-accounts.entity'

@Entity({ name: 'banks', synchronize: false })
export class Bank extends ClassificationEntity {
  @Column({ length: IMAGE_URL_LENGTH })
  imageUrl: string

  @Column({ nullable: true })
  priority: number

  @OneToMany(() => UserAccount, (userAccount) => userAccount.bank)
  userAccountList: UserAccount[]
}
