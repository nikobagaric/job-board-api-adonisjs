import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => User)
  declare userId: HasOne<typeof User>

  @column()
  declare fullName: string

  @column()
  declare resume?: string

  @column()
  declare description?: string

  @column()
  declare workExperience: JSON

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}