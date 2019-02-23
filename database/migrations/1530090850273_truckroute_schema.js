'use strict'

const Schema = use('Schema')

class TruckrouteSchema extends Schema {
  up () {
    this.create('truckroutes', (table) => {
      table.increments()
      table.timestamps()
      table.string('start')
      table.string('destination')
      table.string('date')
      table.string('stops')
    })
  }

  down () {
    this.drop('truckroutes')
  }
}

module.exports = TruckrouteSchema
