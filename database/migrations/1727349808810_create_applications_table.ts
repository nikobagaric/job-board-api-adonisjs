import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateApplicationsTable extends BaseSchema {
  protected tableName = 'applications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('job_id').unsigned().notNullable().references('id').inTable('jobs').onDelete('CASCADE')
      table.integer('applicant_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.text('cover_letter').notNullable()
      table.string('resume').notNullable()
      table.enum('status', ['pending', 'approved', 'rejected']).notNullable().defaultTo('pending')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}