'use strict'

const Schema = use('Schema')

class StationinfoSchema extends Schema {
  up () {
    this.create('stationinfos', (table) => {
      table.increments()
      table.timestamps()
      table.string('location')
      table.string('trans_id')
      table.string('manager_id')
    })
  }

  down () {
    this.drop('stationinfos')
  }
}

module.exports = StationinfoSchema
