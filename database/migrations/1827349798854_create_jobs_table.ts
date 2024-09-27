import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateJobsTable extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('employer_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.text('requirements').notNullable()
      table.string('location').notNullable()
      table.string('salary_range').notNullable()
      table.string('type').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}