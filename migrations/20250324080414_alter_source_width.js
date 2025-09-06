/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('t_mass', function (table) {
        table.string('m_source', 250).alter();
    })
        .alterTable('t_length', function (table) {
            table.string('l_source', 250).alter();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('t_mass', function (table) {
        table.string('m_source', 100).alter();
    })
        .alterTable('t_length', function (table) {
            table.string('l_source', 100).alter();
        });
};
