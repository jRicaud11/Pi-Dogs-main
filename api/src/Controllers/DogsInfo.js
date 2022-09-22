require('dotenv').config();
const { Dog, Temperament } = require('../db')
const axios = require('axios');
const { API_KEY } = process.env;

//Calculo una altura promedia para la raza, se ve mejor que decir altura maxima y minima (Cuando se lea en el front)
const avgHeight = height => {
  const auxArr = height.split(' - ');
  const minHeight = Number(auxArr[0]);
  const maxHeight = Number(auxArr[1]);
  const avg = (minHeight + maxHeight) / 2
  if(minHeight && !maxHeight) return minHeight.toFixed(2);
  if(maxHeight && !minHeight) return maxHeight.toFixed(2);
  return avg.toFixed(2)
};

//Calculo peso promedio de la raza
const avgWeight = weight => {
  if(weight === 'NaN') return 15.00;
  const auxArr = weight.trim().split(' - ');
  
  const minWeight = Number(auxArr[0]);
  const maxWeight = Number(auxArr[1]);

  if(minWeight && !maxWeight) return minWeight.toFixed(2);
  if(maxWeight && !minWeight) return maxWeight.toFixed(2);
  const avg = (minWeight + maxWeight) / 2;

  return avg.toFixed(2)
};

//Calculo una espectativa de vida promedio
const avgLifeSpan = years => {
  const auxArr = years.replace(' years', '').split(' - ') //seteo todo el stirngs a solo numeros para poder hacer operaciones
  const minAge = Number(auxArr[0]);
  const maxAge = Number(auxArr[1]);
  const avg = (minAge + maxAge) / 2

  if(minAge && !maxAge) return minAge;
  if(maxAge && !minAge) return maxAge;
  return avg.toFixed(2)
};

//Traigo todas las razas desde la API

const apiDogs = async() => {
  
  try{
    const dogs = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const dogsSetted = dogs.data.map(e => {
    return {
      id: e.id,
      name: e.name, 
      height: avgHeight(e.height.metric),
      weight: avgWeight(e.weight.metric),
      life_span: avgLifeSpan(e.life_span),
      image: e.image.url,
      temperament: e.temperament
    }
  })

    return dogsSetted;
  } catch (e){
    res.status(400).json({"msg":"Error fetching data from API"})
    
  }
}

//Traigo todas las razas desde la DB
const dbDogs = async() => {
  try{
    const dogs =  await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
    return dogs
  } catch(e) {
    res.status(400).json({"msg":"Error fetching data from DB"})
    
  }
}

const getDogs = async(req, res) => {
  const { name } = req.query;
  //Armo un arreglo con la data de TODAS las razas
  const dogsFromApi = await apiDogs();
  let dogsFromDb = await dbDogs()

  //Formateo temperaments para que tengan el mismo formato que los dogs de la API
  dogsFromDb.forEach((dog) => {
   let newArr = dog.dataValues.temperaments.map(e => {
    return e.dataValues.name
   })
   dog.dataValues.temperaments = newArr.join(', ');
  })
 
  

  const allInfo = [...dogsFromApi, ...dogsFromDb]

  try{
    if(!name) {
      return res.status(200).json(allInfo)
    }
    
    //uso includes para que la busqued del usuario pueda ser mas general 
    const dogByName = allInfo.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
    if(dogByName.length === 0){
      return res.status(404).json({"msg" : "Sorry, we couldn\'t find the race you are looking for"})
    }
    return res.status(200).json(dogByName)
    
  } catch(e) {
    res.status(404).json({"msg" : "There was a problem"});
  }
}

module.exports = {
  apiDogs,
  dbDogs,
  getDogs
}