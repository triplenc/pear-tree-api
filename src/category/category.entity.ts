import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 30, unique: true })
  name: string

  @Column({ length: 255 })
  imageUrl: string

  @Column({ length: 30, unique: true })
  code: string
}
