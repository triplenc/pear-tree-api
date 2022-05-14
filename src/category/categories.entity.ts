import { Column, Entity } from 'typeorm'
import { ClassificationEntity } from '../public/classification.entity'

@Entity()
export class Category extends ClassificationEntity {
  @Column({ length: 255 })
  imageUrl: string
}
