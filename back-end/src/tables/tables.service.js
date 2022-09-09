const knex = require("../db/connection");

function list(){
    return knex("tables").select("*").orderBy("table_name");
}

function read(table_id){
  return knex("tables").select("*").where({ "table_id": table_id}).first()
}

function create(newTable) {
    // Complete the implementation of this method.
  //   return newCustomer;
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then(tableData=>tableData[0])
  }


 function seatTable(table){
  return knex.transaction(function (trx){
    return trx("tables")
    .where({table_id: table.table_id})
    .update(table)
    .returning("*")
    .then(()=>{
      return trx("reservations")
      .where({reservation_id: table.reservation_id})
      .update({status: 'seated'})
      .returning("*")
      .then(updatedRes => updatedRes[0])
    })
  })
 }

 function unSeatTable(table){
  return knex.transaction(function(trx){
    return trx("tables")
    .where({table_id: table.table_id})
    .update({reservation_id: null})
    .returning("*")
    .then(() =>{
      return trx("reservations")
      .where({reservation_id: table.reservation_id})
      .update({status: 'finished'})
      .returning("*")
      .then(tableData => tableData[0])
    })
  })
 }



module.exports ={
    list,
    read,
    create,
    seatTable,
    unSeatTable

}