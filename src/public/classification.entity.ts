import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export abstract class ClassificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 30 })
  code: string

  @Column({ length: 30 })
  name: string
}
