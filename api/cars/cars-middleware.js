const vinValidator = require('vin-validator');
const db  = require('../../data/db-config')
const Car = require('./cars-model')

const checkCarId = async(req, res, next) => {
  try{
    const car = await Car.getById(req.params.id)
    if(!car){
      next({status:404, message: `car with id ${req.params.id} is not found`})
    }else{
      req.car = car
      next()
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage } = req.body
  if(!vin){
    const error = {message: 'vin is missing', status:400}
    next(error)
  }else if(!make){
    const error = {message: 'make is missing', status:400}
    next(error)
  }else if(!model){
    const error = {message: 'model is missing', status:400}
    next(error)
  }else if(!mileage){
    const error = {message: 'mileage is missing', status:400}
    next(error)
  }else{
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const vinNumber = req.body.vin
  const isValid = vinValidator.validate(vinNumber)
  if(!isValid){
    const error = {message: `vin ${vinNumber} is invalid`, status:400}
    next(error)
  }else{
    req.vin = vinNumber
    next()
  }
}

const checkVinNumberUnique = async(req, res, next) => {
  try{
    const taken = await db('cars').where('vin', req.body.vin).first()
    if(taken){
      next({status: 400, message: `vin ${req.body.vin} already exists`})
    }else{
      next()
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}