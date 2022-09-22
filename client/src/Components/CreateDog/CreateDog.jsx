import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector,  useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getTemperaments, postDog } from '../../actions/index'
import { Link } from 'react-router-dom'
import style from './CreateDog.module.css'

export default function CreateDog(){
  // let dogId = '';
  const history = useHistory();
  const dispatch = useDispatch()
  let temperaments = useSelector(state => state.allTemperaments)
  const errorCreate = useSelector(state => state.errorMsg)
  const [show, setShow] = useState(false)
  const [dogId, setDogId] = useState('')
  let existingDogs = useSelector(state => state.originalDogs)
  temperaments = temperaments ? temperaments.sort((a,b) => {
    return a.name > b.name ? 1 : -1
  }) : null
  

  const [errorManager, setErrorManager] = useState({
    name: '',
    maxHight: '',
    minHight: '',
    maxWeight: '',
    minWeight: '',
    life_span: '',
    temperament:'Choose up to 5 temperaments'
  })

  const [newDog, setNewDog] = useState({
    name: '',
    maxHight: '',
    minHight: '',
    maxWeight: '',
    minWeight: '',
    life_span: '',
    image: '',
    temperament: [] 
  })
  useEffect(() =>{
    dispatch(getTemperaments());
  }, [dispatch])

  function handleChangeName(e){
    const onlyLetters =  new RegExp (/^(^$|[ a-z ])+$/i)
    if(!onlyLetters.test(e.target.value)) {
      setErrorManager({...errorManager, [e.target.name]: 'Only letters allowed'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    }
    
   
    setErrorManager({...errorManager, [e.target.name]: ''})
    if(existingDogs.some(d => d.name.toUpperCase() === e.target.value.toUpperCase())){
      setErrorManager({...errorManager, [e.target.name]: 'Race already exists'})
    } 
    setNewDog({...newDog, [e.target.name]: e.target.value})
  }

  function handleChangeMinHight(e){
    const onlyNumbers = new RegExp(/^\d*\.{0,1}\d*$/)
    if (!onlyNumbers.test(e.target.value)) {
      setErrorManager({...errorManager, [e.target.name]: 'Only numbers and one dot allowed'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    }

    if(Number(newDog.maxHight) <= Number(e.target.value)) {
      setErrorManager({...errorManager, [e.target.name]: 'Min. Height must be smaller than Max. Height'})
    } else {
      setErrorManager({...errorManager, [e.target.name]: ''})
    }

    setNewDog({...newDog, [e.target.name]: e.target.value})
  }

  function handleChangeMaxHight(e){
    const onlyNumbers = new RegExp(/^\d*\.{0,1}\d*$/)
    if(!onlyNumbers.test(e.target.value)){
      setErrorManager({...errorManager, [e.target.name]:'Only numbers and one dot allowed'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    }

    if(Number(e.target.value) <= Number(newDog.minHight)){ 
      setErrorManager({...errorManager, [e.target.name]:'Max. Height must be higher than Min. Height'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    } else {
      if(errorManager.minHight.includes('Max.')){
        setNewDog({...newDog, [e.target.name]: e.target.value})
        return setErrorManager({...errorManager, minHight:'', [e.target.name]: ''})
      }
    } 
    
    
    setErrorManager({...errorManager, [e.target.name]: ''})
    setNewDog({...newDog, [e.target.name]: e.target.value})
  }

  function handleChangeMinWeight(e){
    const onlyNumbers = new RegExp(/^\d*\.{0,1}\d*$/)
    if(!onlyNumbers.test(e.target.value)){
      setErrorManager({...errorManager, [e.target.name]: 'Only numbers and one dot allowed'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    }

    if(Number(newDog.minWeight) <= Number(e.target.value)) {
      setErrorManager({...errorManager, [e.target.name]: 'Min. Weight must be smaller than Max. Weight'})
    } else {
      setErrorManager({...errorManager, [e.target.name]: ''})
    }

    setNewDog({...newDog, [e.target.name]: e.target.value})
  }

  function handleChangeMaxWeight(e){
    const onlyNumbers = new RegExp(/^\d*\.{0,1}\d*$/)
    if(!onlyNumbers.test(e.target.value)){
      setErrorManager({...errorManager, [e.target.name]: 'Only numbers and one dot allowed'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    }
    
    if(Number(e.target.value) <= Number(newDog.minWeight)){ 
      setErrorManager({...errorManager, [e.target.name]: 'Max. Weight must be higher than Min. Weight'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    }else {
      if(errorManager.minWeight.includes('Max.')){
        console.log('aca')
        setNewDog({...newDog, [e.target.name]: e.target.value})
        return setErrorManager({...errorManager, minWeight:'', [e.target.name]: ''})
      }
    } 

    setErrorManager({...errorManager, [e.target.name]: ''})
    setNewDog({...newDog, [e.target.name]: e.target.value})
  }

  function handleChangeLifeSpan(e){
    const onlyNumbers = new RegExp(/^\d*\.{0,1}\d*$/)
    if(!onlyNumbers.test(e.target.value)){
    setErrorManager({...errorManager, [e.target.name]: 'Only numbers and one dot allowed'})
    return setNewDog({...newDog, [e.target.name]: e.target.value})
    }
    if(e.target.value > 50) {
      setErrorManager({...errorManager, [e.target.name]: 'Life Span should be less than 50 years'})
      return setNewDog({...newDog, [e.target.name]: e.target.value})
    }
    setErrorManager({...errorManager, [e.target.name]: ''})
    setNewDog({...newDog, [e.target.name]: e.target.value})
  }

  function handleClickCancel(e){
    e.preventDefault()
    history.goBack()
  }

  function handleChangeImage(e){
    setNewDog({...newDog, image: e.target.value})
  }

  function handleTemperaments(e){
    if(newDog.temperament.includes(e.target.value)){
      return setErrorManager({...errorManager, temperament: `You can only choose ${e.target.value} once`})
    }
    if(newDog.temperament.length > 4){
      return setErrorManager({...errorManager, temperament: 'You can only select 5 temperaments'})
    }

    setErrorManager({...errorManager, temperament:''});
    setNewDog({...newDog, temperament: [...newDog.temperament, e.target.value]})
  }

  function handleClickTemperaments(e){
    setNewDog({
      ...newDog,
      temperament: newDog.temperament.filter(t => t !== e.target.innerText)
    })

    if(newDog.temperament.length < 6) setErrorManager({...errorManager, temperament: ''})
  }

  function activeCreate(){
    if (Object.values(errorManager).some(error => error !=='')) return true;
    if(!newDog.name || !newDog.maxHight || !newDog.minHight || !newDog.maxWeight || !newDog.minWeight || !newDog.life_span || newDog.temperament.length < 0) return true;
    
  }

  async function handleSubmit(e){
    e.preventDefault();
    const avgHeight = (Number(newDog.minHight) + Number(newDog.maxHight)) / 2
    const avgWeight = (Number(newDog.minWeight) + Number(newDog.maxWeight)) / 2
    const img = newDog.image || "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg"
    const dog = {
      name: newDog.name,
      height: avgHeight.toFixed(2),
      weight: avgWeight.toFixed(2),
      life_span: newDog.life_span,
      temperament: newDog.temperament,
      image: img
    }
    const testing = dispatch(postDog(dog))
    const newId = await testing.then(res => res.id)
    setDogId(newId)
    setShow(true)
   
  }

  function okButton(){ 
    setShow(false)
    if(errorCreate===''){
      history.push(`/dogs/${dogId}`)
    } else {
      history.push('/home')
    }
  }

  return(
    <div className={style.container}> 
      <div className={style.formContainer}>
        <h1>Create Dog</h1>

        <form className={style.form} onSubmit={handleSubmit}>

          <div className={style.grouping}>
            <label for='name'>Name *</label>
            <input name='name' id='name' placeholder='Name' onChange={handleChangeName} value={newDog.name} autoComplete='off' required/>
            <span className={style.error}>{errorManager.name}</span>
          </div>

          <div className={style.grouping}>
            <label for='minHight'>Min. Height *</label>
            <input name='minHight' id='minHight' placeholder='Minimum Hight (cm)' onChange={handleChangeMinHight} value={newDog.minHight} autoComplete='off' />
            {<span className={style.error}>{errorManager.minHight}</span>}
          </div>

          <div className={style.grouping}>
            <label for='maxHight'>Max. Height *</label>
            <input name='maxHight' id='maxHight' placeholder='Maximum Hight (cm)' onChange={handleChangeMaxHight} value={newDog.maxHight} autoComplete='off' />
            {<span className={style.error}>{errorManager.maxHight}</span>}
          </div>

          <div className={style.grouping}>
            <label for='minWeight'>Min. Weight *</label>
            <input name='minWeight' id='minWeight'placeholder='Minimum Weight (kg)' onChange={handleChangeMinWeight} value={newDog.minWeight} autoComplete='off' />
            {<span className={style.error}>{errorManager.minWeight}</span>}
          </div>

          <div className={style.grouping}>
            <label for='maxWeight'>Max. Weight *</label>
            <input name='maxWeight' id='maxWeight' placeholder='Maximum Weight (kg)' onChange={handleChangeMaxWeight} value={newDog.maxWeight} autoComplete='off' />
            {<span className={style.error}>{errorManager.maxWeight}</span>}
          </div>

          <div className={style.grouping}>
            <label for='life_span'>Life Span *</label>
            <input name='life_span' id='life_span' placeholder='Life Span' onChange={handleChangeLifeSpan} value={newDog.life_span} autoComplete='off' />
            {<span className={style.error}>{errorManager.life_span}</span>}
          </div>

          <div className={style.grouping}>
            <label for='image'>Image</label>
            <input name='image' placeholder='Image URL' onChange={handleChangeImage} value={newDog.image} autoComplete='off' />
          </div>

          <div className={style.grouping}>
            <label>Temperaments *</label>
            <select onChange={handleTemperaments}>
            <option selected='defaultValue' disabled>Temperaments</option>
              {temperaments && temperaments.map(t => {
                return <option name='temperament' key={t.id} value={t.name}>{t.name}</option>
              })}
            </select>
            {<span className={style.error}>{errorManager.temperament}</span>}
            <div className={style.temperaments}>
              {newDog.temperament.map(e => {
                    return <span key= {e} name={e} onClick={handleClickTemperaments}>{e}</span>
              })}
            </div>
          </div>

          <div className='style.buttons'>
            <button type="button" className={`${style.btns} ${style.cancel}`} onClick={handleClickCancel}>CANCEL</button>
            <button className={`${style.btns} ${style.create}`} disabled={activeCreate()}>CREATE</button>
          </div>
          <span>* Required Fields</span>
        </form>
              
      </div>
      {show && <div className={style.containerMsg}>
        <h2>{errorCreate || 'Dog succefully created'}</h2>
        {/* <Link to={`/dogs/${dogId}`} >
          <button className={style.okBtn}>Ok</button>
        </Link> */}
          <button className={style.okBtn} onClick={okButton}>Ok</button>
      </div>}
    </div>
  )
}