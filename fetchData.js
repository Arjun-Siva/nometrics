//const knex = require("knex");
const knexfile = require("./knexfile");
const db = require("knex")(knexfile["production"]);

module.exports = async (domain, unit, value) => {
    if (domain === "length") {
        const lowerThanHalf = await db("t_length")
        .select(db.raw("l_name AS name, convert_to_meter(lower(?), ?) / l_value AS value, l_source AS source", [unit, value]))
        .whereRaw("l_value < convert_to_meter(lower(?), ?)", [unit, value / 2])
        .orderByRaw("RANDOM()")
        .limit(1);

        if (lowerThanHalf.length != 0)
            return lowerThanHalf;

        const lowerThanCurrent = await db("t_length")
        .select(db.raw("l_name AS name, convert_to_meter(lower(?), ?) / l_value AS value, l_source AS source", [unit, value]))
        .whereRaw("l_value <= convert_to_meter(lower(?), ?)", [unit, value])
        .orderByRaw("RANDOM()")
        .limit(1);

        if (lowerThanCurrent.length != 0)
            return lowerThanCurrent;

        const greaterThanCurrent = await db("t_length")
        .select(db.raw("l_name AS name, convert_to_meter(lower(?), ?) / l_value AS value, l_source AS source", [unit, value]))
        .whereRaw("l_value > convert_to_meter(lower(?), ?)", [unit, value])
        .orderByRaw("RANDOM()")
        .limit(1);

        return greaterThanCurrent;
    }

    else if (domain === "mass") {
        const lowerThanHalf = await db("t_mass")
        .select(db.raw("m_name AS name, convert_to_kilogram(lower(?), ?) / m_value AS value, m_source AS source", [unit, value]))
        .whereRaw("m_value < convert_to_kilogram(lower(?), ?)", [unit, value / 2])
        .orderByRaw("RANDOM()")
        .limit(1);

        if (lowerThanHalf.length != 0)
            return lowerThanHalf;

        const lowerThanCurrent = await db("t_mass")
        .select(db.raw("m_name AS name, convert_to_kilogram(lower(?), ?) / m_value AS value, m_source AS source", [unit, value]))
        .whereRaw("m_value <= convert_to_kilogram(lower(?), ?)", [unit, value])
        .orderByRaw("RANDOM()")
        .limit(1);

        if (lowerThanCurrent.length != 0)
            return lowerThanCurrent;

        const greaterThanCurrent = await db("t_mass")
        .select(db.raw("m_name AS name, convert_to_kilogram(lower(?), ?) / m_value AS value, m_source AS source", [unit, value]))
        .whereRaw("m_value > convert_to_kilogram(lower(?), ?)", [unit, value])
        .orderByRaw("RANDOM()")
        .limit(1);

        return greaterThanCurrent;
    }
    
}