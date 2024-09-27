import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

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

  @hasOne(() => User)
  declare applicantId: HasOne<typeof User>

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