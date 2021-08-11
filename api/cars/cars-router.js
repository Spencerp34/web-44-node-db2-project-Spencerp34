const router = require('express').Router()
const mw = require('./cars-middleware')
const Car = require('./cars-model')


router.get('/', async(req, res, next) => {
    try{
        const cars = await Car.getAll()
        res.status(200).json(cars)
    }catch(err){
        next(err)
    }
})

router.get('/:id', mw.checkCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.post('/', mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique,  async(req, res, next) => {
    try{
        const newCar = await Car.create({
            vin: req.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            title: req.body.title,
            transmission: req.body.transmission
        })
        res.status(201).json(newCar)
    }catch(err){
        next(err)
    }
})

// router.put('/:id', checkCarId, checkCarPayload, async(req, res, next) => {
//     res.json({message: 'update'})
// })

// router.delete('/:id', checkCarId, async(req, res, next) => {
//     res.json({message: 'delete'})
// })

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message || 'not found'})
})

module.exports = router;