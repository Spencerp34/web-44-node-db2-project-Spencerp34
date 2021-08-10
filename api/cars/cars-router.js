const router = require('express').Router()
const { 
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')
const Car = require('./cars-model')


router.get('/', async(req, res, next) => {
    res.json({message: 'get'})
})

router.get('/:id', checkCarId, (req, res) => {
    res.json({message: 'get by id'})
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique,  (req, res) => {
    res.json({message: 'post'})
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