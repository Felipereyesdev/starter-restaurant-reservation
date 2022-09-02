const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await service.list();

  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `${propertyName}` });
  };
}

function lengthOfTable_name(req,res,next){
    const { data = {} } = req.body;
    const table_name = data.table_name;
    if(table_name.length > 1){
        return next();

    }
    next({ status: 400, message: `table_name` });
}

function isInteger(req,res,next) {
  const {data = {}} = req.body
  if(Number.isInteger(data.capacity)){
    return next()
  }
  return next({ status: 400, message: `capacity must be a number`})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("table_name"),
    lengthOfTable_name,
    bodyDataHas("capacity"),
    isInteger,
    asyncErrorBoundary(create)
  ]
}
