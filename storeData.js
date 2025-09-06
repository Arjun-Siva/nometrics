const knexfile = require("./knexfile");
const db = require("knex")(knexfile["production"]);

module.exports = async (domain, unit, name, value, source) => {
    let result = {};
    if (domain === "length") {
        await db('t_length_temp').insert({
            lt_name: name,
            lt_value: db.raw("convert_to_meter(lower(?), ?)", [unit, value]),
            lt_source: source
        })
        .then (() => {
            result = {state:0, message:"Successfully submtted!"};
        })
        .catch(error => {
            if(error.detail.includes("already exists")) {
                result = {state:-1, message:"Entry already exists!"}
            }
            else {
                result = {state:0, message:"Error! Try again later"}
            }
        });
    }
    else if (domain === "mass") {

        await db('t_mass_temp').insert({
            mt_name: name,
            mt_value: db.raw("convert_to_kilogram(lower(?), ?)", [unit, value]),
            mt_source: source
        })
        .then (() => {
            result = {state:0, message:"Successfully submtted!"};
        })
        .catch(error => {
            if(error.detail.includes("already exists")) {
                result = {state:-1, message:"Entry already exists!"}
            }
            else {
                result = {state:0, message:"Error! Try again later"}
            }
        });
    }

    return result;

}