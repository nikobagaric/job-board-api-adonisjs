import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => User)
  declare employerId: HasOne<typeof User>

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare requirements: string

  @column()
  declare location: string

  @column()
  declare salaryRange: string

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}