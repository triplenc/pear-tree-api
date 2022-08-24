import { Column } from 'typeorm'
import { DefaultEntity } from './default.entity'

export abstract class ClassificationEntity extends DefaultEntity {
  @Column({ length: 30, unique: true })
  code: string

  @Column({ length: 30, unique: true })
  name: string
}
