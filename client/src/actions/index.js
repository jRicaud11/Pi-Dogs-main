import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const APLHABETIACAL_ORDER = 'ALPHABETICAL_ORDER';
export const WEIGHT_ORDER = 'WEIGHT_ORDER';
export const GET_ORIGIN_DB = 'GET_ORIGIN_DB';
export const GET_TEMPERAMENTS_FILTER = 'GET_TEMPERAMENTS_FILTER'
export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME'
export const REFRESH_DEFAULT = 'REFRESH_DEFAULT'
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL'
export const CLEAR_INFO = 'CLEAR_INFO'
export const CREATE_NEW_DOG = 'CREATE_NEW_DOG'
export const DELETE_DOG = 'DELETE_DOG'
export const SET_ERROR = 'SET_ERROR'
export const SET_PAGE = 'SET_PAGE'


export function setPage(move){
  return {type:SET_PAGE, payload: move}
}

export function deleteDog(id){
  return async function(dispatch){
    try{
      const deletedDog = await axios.delete(`/dogs/${id}`)
      dispatch({type: DELETE_DOG, payload: deletedDog.data.dog})
      dispatch({type: SET_ERROR, payload: deletedDog.data.msg})
    } catch (e){
      dispatch({type: SET_ERROR, payload: e.response.data.msg})
    }
  }
}
export function postDog(newDog){
  return async function(dispatch){
    try{
      const postDog = await axios.post('/dogs', newDog);
      dispatch({type: CREATE_NEW_DOG, payload: postDog.data})
      return(postDog.data)
    }
    catch (e){
      dispatch({type:SET_ERROR, payload: e.response.data.msg})
    }
  }
}
export function clearError(){
  return function(dispatch){
    dispatch({type: SET_ERROR, payload: ''})
  }
}

export function getDogs(){
  return async function(dispatch){
    try{
      const backData = await axios('/dogs');
      return dispatch({type: GET_DOGS, payload: backData.data});
    } catch(e){
      dispatch({type:SET_ERROR, payload: e.response.data.msg})
    }
  }
}

export function getDogDetail(id){
  return async function(dispatch){
    try{
      const details = await axios(`/dogs/${id}`)
      return dispatch({type: GET_DOG_DETAIL, payload: details.data})
    } catch(e){
      dispatch({type:SET_ERROR, payload: e.response.data.msg})
    }
  }
}

export function getTemperaments(){
  return async function(dispatch){
    const temperaments = await axios('/temperaments');
    return dispatch({type: GET_TEMPERAMENTS, payload: temperaments.data});
  }
}

export function alphabeticalOrder(direction){
  return {type: APLHABETIACAL_ORDER, payload: direction}
}

export function weightOrder(direction){
  return {type: WEIGHT_ORDER, payload: direction}
}

export function getOriginDB(origin){
  return {type:GET_ORIGIN_DB, payload: origin}
}

export function getTemperamentsFilter(temp){
  return {type: GET_TEMPERAMENTS_FILTER, payload: temp}
}

export function getDogByName(race){
  return async function(dispatch){
    let dogs = '';
    try{
      dogs = await axios(`/dogs?name=${race}`)
      return dispatch({type: GET_DOG_BY_NAME, payload: dogs.data})
    } catch(e) {
      dispatch({type:SET_ERROR, payload: e.response.data.msg})
      
    }
  }
}

export function refreshDefaultValues(){
  return {type: REFRESH_DEFAULT}
}

export function clearInfo(){
  return {type: CLEAR_INFO}
}