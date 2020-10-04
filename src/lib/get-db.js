import knex from 'knex'
import * as knexfile from '../../knexfile'
const env = process.env.NODE_ENV || 'development'

export default function getDB () {
  if (!env || !knexfile[env]) {
    throw new Error('Cannot find DB Environment')
  }

  return knex(knexfile[env])
}
