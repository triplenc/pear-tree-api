import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 30 })
  title: string

  @Column({ length: 100 })
  content: string
}
