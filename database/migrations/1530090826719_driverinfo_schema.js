'use strict'

const Schema = use('Schema')

class DriverinfoSchema extends Schema {
  up () {
    this.create('driverinfos', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('DOB')
      table.string('lic_num')
      table.string('route')
      table.string('truck_id')


    })
  }

  down () {
    this.drop('driverinfos')
  }
}

module.exports = DriverinfoSchema
