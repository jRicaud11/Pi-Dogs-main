const { apiDogs } = require('./DogsInfo')
const { Dog, Temperament } = require('../db');

const dogById = async(req, res) => {
  const { id } = req.params;
  
  //si tiene - es una id generada con uuidv4 por lo que va a estar en la DB
  try{
    if (id.includes('-')){
        let dog = await Dog.findOne({
          where: { id : id},
          include: {
            model: Temperament,
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        })
        
        //Acomodo temperaments para que quede igual que lo que viene de la API
        dog.dataValues.temperaments = dog.dataValues.temperaments.map(d => d.dataValues.name).join(', ')
        return res.status(200).json(dog.dataValues)
    } 
    
    const dogsFromApi = await apiDogs();
    const dog = dogsFromApi.find(d => d.id === Number(id));
    return res.status(200).json(dog);
    
  } catch(e){
      return res.status(404).json({"msg" : "Sorry, we didn\'t find the dog you're looking for"})
    }
}

module.exports = {
  dogById
}

