/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.raw(`
    CREATE FUNCTION convert_to_meter(unit VARCHAR,value DOUBLE PRECISION)
    RETURNS DOUBLE PRECISION AS $$
    BEGIN
    CASE unit
        WHEN 'nanometer' THEN RETURN value * 1e-9;
        WHEN 'micron' THEN RETURN value * 1e-6;
        WHEN 'millimeter' THEN RETURN value * 1e-3;
        WHEN 'centimeter' THEN RETURN value * 1e-2;
        WHEN 'inch' THEN RETURN value * 0.0254;
        WHEN 'foot' THEN RETURN value * 0.3048;
        WHEN 'yard' THEN RETURN value * 0.9144;
        WHEN 'meter' THEN RETURN value * 1;
        WHEN 'kilometer' THEN RETURN value * 1000;
        WHEN 'mile' THEN RETURN value * 1609;
        WHEN 'light year' THEN RETURN value * 9.461e+15;
        WHEN 'parsec' THEN RETURN value * 3.086e+16;
    END CASE;
    END;
    $$ LANGUAGE plpgsql;
    `)
    .raw(`
    CREATE FUNCTION convert_to_kilogram(unit VARCHAR,value DOUBLE PRECISION)
    RETURNS DOUBLE PRECISION AS $$
    BEGIN
    CASE unit
        WHEN 'microgram' THEN RETURN value * 1e-9;
        WHEN 'milligram' THEN RETURN value * 1e-6;
        WHEN 'gram' THEN RETURN value * 1e-3;
        WHEN 'ounce' THEN RETURN value * 0.0283495;
        WHEN 'pound' THEN RETURN value * 0.453592;
        WHEN 'kilogram' THEN RETURN value * 1;
        WHEN 'tonne' THEN RETURN value * 1000;
        WHEN 'solar mass' THEN RETURN value * 1.989e+30;
    END CASE;
    END;
    $$ LANGUAGE plpgsql;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.raw(`
        DROP FUNCTION IF EXISTS convert_to_meter(VARCHAR, DOUBLE PRECISION);
      `)
      .raw(`
        DROP FUNCTION IF EXISTS convert_to_kilogram(VARCHAR, DOUBLE PRECISION);
        `);
};
