/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.raw(`
    CREATE INDEX l_val_index
    ON public.t_length USING btree
    (l_value)
    INCLUDE(l_value)
    WITH (deduplicate_items=True);
    `)
        .raw(`
    CREATE INDEX m_val_index
    ON public.t_mass USING btree
    (m_value)
    INCLUDE(m_value)
    WITH (deduplicate_items=True);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.raw(`
        DROP INDEX l_val_index;
      `)
        .raw(`
        DROP INDEX m_val_index;
        `);
};
