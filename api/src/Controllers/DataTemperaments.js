const { apiDogs } = require('./DogsInfo')
const { Temperament } = require('../db');

const temperaments = async(req, res) => {
  //consigue todos los temps desde la api y luego los inserto en la base de datos, viene un arreglo de arreglos
  const apiData = await apiDogs();
    
  //transformo apiData en un solo arreglo plano donde cada elemento es un temperamento
  const temperaments = apiData.map(e => e.temperament?.split(', ')).flat();
  const uniqueTemperaments = [... new Set(temperaments)] //creo un set para borrar los duplicados y hago un spread para volverlo un array

  uniqueTemperaments.forEach(async (el) => {
    if(!el) return;

    const [temp, created] = await Temperament.findOrCreate({
      where: { name : el },
      default: { 
        name : el 
      }
    })
  })

  const temperamentsDB = await Temperament.findAll();

  res.status(201).json(temperamentsDB)
}

module.exports = {
  temperaments
}