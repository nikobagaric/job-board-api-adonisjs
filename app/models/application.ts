import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export default class Application extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare jobId: number

  @column()
  declare applicantId: number

  @column()
  declare coverLetter: string

  @column()
  declare resume: string

  @column()
  declare status: ApplicationStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}