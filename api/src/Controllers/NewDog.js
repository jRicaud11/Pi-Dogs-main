const { Dog, Temperament } = require('../db')
const { v4: uuidv4 } = require('uuid');

const newDog = async(req, res) => {
  const { name, height, weight, life_span, temperament, image, id } = req.body;
 
  if(!name || !height || !weight || !life_span || !temperament) {
    return res.status(400).json({"msg" : "Parameters missing"})
  }
  
  try {
    let newDog = await Dog.create({
      id,
      name, 
      height,
      weight,
      life_span,
      image
    })

    const temperamentsDB = await Temperament.findAll({
      where:{
        name : temperament
      }
    })
    
    await newDog.addTemperaments(temperamentsDB);
    newDog = {...newDog.dataValues, temperaments: temperament.join(', ')}
    res.status(200).json(newDog)
  } catch(e) {
    res.status(400).json({"msg":"Something went wrong, try again later"})
  }
}

module.exports = {
  newDog
}