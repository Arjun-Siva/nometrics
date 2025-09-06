/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('t_mass', (table) => {
        table.increments('m_id');
        table.string('m_name', 50);
        table.double('m_value').notNullable();
        table.string('m_source', 100);

        table.primary(['m_id', 'm_name']);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('t_mass');
  
};
