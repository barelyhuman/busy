const tableToCheck = 'transactions'

exports.up = function (knex) {
  return knex.schema.hasTable(tableToCheck).then((exists) => {
    if (exists) {
      return knex.schema.table(tableToCheck, function (table) {
        table.text('transaction_hash').notNullable()
      })
    }
    return Promise.resolve()
  })
}

exports.down = function (knex) {
  return knex.schema.hasTable(tableToCheck).then((exists) => {
    if (exists) {
      return knex.schema.table('transactions', function (table) {
        table.dropColumn('transaction_hash')
      })
    }
  })
}
