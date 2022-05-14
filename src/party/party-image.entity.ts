import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PartyImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  imageUrl: string
}
