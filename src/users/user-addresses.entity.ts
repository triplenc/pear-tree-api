import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  address: string

  @Column({ length: 100 })
  extraAddress: string

  @Column({ length: 40 })
  latitude: string

  @Column({ length: 40 })
  longitude: string

  @Column()
  isRecent: boolean
}
