const { Router } = require('express');
const router = Router();
// const cors = require('cors')
const { getDogs } = require('../Controllers/DogsInfo');
const { dogById } = require('../Controllers/DogId');
const { newDog } = require('../Controllers/NewDog')
const { temperaments } = require('../Controllers/DataTemperaments')
const { deleteDog } = require('../Controllers/deleteDog')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use(cors())
/*--------------DOGS------------------*/
router.get('/dogs', getDogs)
router.get('/dogs/:id', dogById)
router.delete('/dogs/:id', deleteDog)
router.post('/dogs', newDog)

/*---------------TEMPERAMENTS-----------*/
router.get('/temperaments', temperaments)



module.exports = router;
