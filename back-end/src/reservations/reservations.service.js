const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*").orderBy("reservations.reservation_time");
}

function read(reservationId){
  return knex("reservations").select("*").where({ "reservation_id": reservationId }).first()
}

function listDate(date){
return knex("reservations").select("*").where({"reservations.reservation_date": date}).orderBy("reservations.reservation_time")
}

function create(newReservation) {
    // Complete the implementation of this method.
  //   return newCustomer;
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then(reservationData=>reservationData[0])
  }

module.exports ={
    list,
    read,
    listDate,
    create
}