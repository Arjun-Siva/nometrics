/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('t_mass_temp', (table) => {
        table.increments('mt_id');
        table.string('mt_name', 50);
        table.double('mt_value').notNullable();
        table.string('mt_source', 250).notNullable();

        table.primary(['mt_name']);
    })
        .createTable('t_length_temp', (table) => {
            table.increments('lt_id');
            table.string('lt_name', 50);
            table.double('lt_value').notNullable();
            table.string('lt_source', 250).notNullable();

            table.primary(['lt_name']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('t_length_temp')
    .dropTableIfExists('t_mass_temp');
};
