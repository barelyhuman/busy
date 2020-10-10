const projectRequests = require('../constants/project-requests')

exports.up = function (knex) {
  return knex.schema
    .createTable('project_requests', function (table) {
      table.increments('id').unique().primary().notNullable()
      table.text('title').notNullable()
      table.text('description').notNullable()
      table.enu('type', projectRequests.types).notNullable()
      table.boolean('is_active').notNullable().default(true)
      table.integer('project_id').notNullable()
      table.timestamps(true, true)

      table
        .foreign('project_id')
        .references('projects.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('project_requests_user_mapping', function (table) {
      table.increments('id').unique().primary().notNullable()
      table.boolean('is_active').notNullable().default(true)
      table.integer('project_request_id').notNullable()
      table.integer('user_id').notNullable()

      table.timestamps(true, true)

      table
        .foreign('project_request_id')
        .references('project_requests.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .foreign('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('comments', function (table) {
      table.increments('id').unique().primary().notNullable()
      table.string('content').notNullable()
      table.boolean('is_active').notNullable().default(true)
      table.integer('from_user_id').notNullable()

      table.timestamps(true, true)
      table
        .foreign('from_user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('project_requests_comments_mapping', function (table) {
      table.increments('id').unique().primary().notNullable()
      table.boolean('is_active').notNullable().default(true)
      table.integer('project_request_id').notNullable()
      table.integer('comment_id').notNullable()

      table.timestamps(true, true)

      table
        .foreign('project_request_id')
        .references('project_requests.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .foreign('comment_id')
        .references('comments.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('project_requests_comments_mapping')
    .dropTableIfExists('comments')
    .dropTableIfExists('project_requests_user_mapping')
    .dropTableIfExists('project_requests')
}
