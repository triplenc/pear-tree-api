import { Column } from 'typeorm'
import { DefaultEntity } from './default.entity'

export abstract class ClassificationEntity extends DefaultEntity {
  @Column({ length: 30 })
  code: string

  @Column({ length: 30 })
  name: string
}
