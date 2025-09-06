/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('t_length', (table) => {
        table.increments('l_id');
        table.string('l_name', 50);
        table.double('l_value').notNullable();
        table.string('l_source', 100);

        table.primary(['l_id', 'l_name']);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('t_length');
  
};
