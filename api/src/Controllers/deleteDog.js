const { Dog } = require('../db')


const deleteDog = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('Missing ID');
  console.log('id', id)
  try{
      const dog = await Dog.destroy({
        where:{
          id
      }
    })
    return res.status(200).json({"msg":"Dog succefully deleted", "dog": id})
  } catch(error){
    res.status(404).json({"msg":'No dog founded with this ID'})
  }

}

module.exports = {
  deleteDog
}