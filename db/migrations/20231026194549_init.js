/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('auth_token').notNullable().unique();
      table.timestamps(true, true);
    })
    
    .createTable('projects', table => {
      table.string('id').primary(); 
      table.string('title').notNullable();
      table.string('image').notNullable();
      table.text('tech').notNullable();
      table.string('link').notNullable();
      table.string('gh').notNullable();
      table.text('description').notNullable();
      table.string('instructions');
      table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema
    .dropTable('users')
    .dropTable('projects')
};
