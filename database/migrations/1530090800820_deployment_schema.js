'use strict'

const Schema = use('Schema')

class DeploymentSchema extends Schema {
  up () {
    this.create('deployments', (table) => {
      table.increments()
      table.timestamps()
      table.string('date')
      table.string('station')
      table.string('route')
      table.string('truck_id')
      table.string('driver_id')
      table.float('quantity')
    })
  }

  down () {
    this.drop('deployments')
  }
}

module.exports = DeploymentSchema
