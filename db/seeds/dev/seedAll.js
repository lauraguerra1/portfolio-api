const dotenv = require('dotenv')
dotenv.config()
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const {users, projects} = require('../../data/data')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  try {

    await knex('projects').del()
    await knex('users').del() 

    await knex('users').insert(users).returning('*')
    await knex('projects').insert(projects).returning('*')
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};