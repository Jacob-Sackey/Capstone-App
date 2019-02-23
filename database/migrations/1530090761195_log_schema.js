'use strict'

const Schema = use('Schema')

class LogSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments()
      table.timestamps()
      table.string('date')
      table.string('supplier')
      table.float ('quantity')
      table.string('comments')
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogSchema
