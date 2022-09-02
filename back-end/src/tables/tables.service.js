const knex = require("../db/connection");

function list(){
    return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
    // Complete the implementation of this method.
  //   return newCustomer;
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then(tableData=>tableData[0])
  }

module.exports ={
    list,
    create
}