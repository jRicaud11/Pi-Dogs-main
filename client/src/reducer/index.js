import {  CLEAR_INFO, 
          GET_DOGS, 
          GET_TEMPERAMENTS, 
          APLHABETIACAL_ORDER, 
          WEIGHT_ORDER, 
          GET_ORIGIN_DB, 
          GET_TEMPERAMENTS_FILTER, 
          GET_DOG_BY_NAME, 
          REFRESH_DEFAULT, 
          GET_DOG_DETAIL,
          CREATE_NEW_DOG,
          DELETE_DOG,
          SET_ERROR } from '../actions/index'

const INITIAL_STATE = {
  originalDogs : [],
  allDogs : [],
  allTemperaments : [],
  dogDetail: {},
  errorMsg: ''
}

export default function rootReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case(SET_ERROR): {
      return{
        ...state,
        errorMsg: action.payload
      }
    }
    case(CREATE_NEW_DOG):{
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload],
        originalDogs: [...state.originalDogs, action.payload]
      }
    }
    case(DELETE_DOG): {
      return{
        ...state,
        allDogs: state.allDogs.filter(el => el.id !== action.payload),
        originalDogs: state.originalDogs.filter(el => el.id !== action.payload)
      } 
    }
    case(CLEAR_INFO):{
      return {
        ...state,
        dogDetail: {}
      }
    }
    case(GET_DOG_DETAIL):{
      return {
        ...state,
        dogDetail: action.payload
      }
    }
    case(REFRESH_DEFAULT): {
      return {
        ...state,
        allDogs: [...state.originalDogs]
      }
    }
    case(GET_DOG_BY_NAME): {
      return {
        ...state,
        allDogs: action.payload
      }
    }
    case (GET_TEMPERAMENTS_FILTER): {
      const filters = [...state.allDogs];
      let temperamentsFiltered = filters.filter(el => {
        return(
          el.temperament?.includes(action.payload) || 
          el.temperament?.includes(`${action.payload},`) ||
          el.temperaments?.includes(action.payload) ||
          el.temperaments?.includes(`${action.payload},`)
        )
      })
      console.log(temperamentsFiltered)
      return {
        ...state,
        allDogs: temperamentsFiltered
      }
    }
    case(GET_DOGS): {
      return {
        ...state,
        allDogs: action.payload,
        originalDogs: action.payload
      }
    }
    case(GET_TEMPERAMENTS): {
      return{
        ...state,
        allTemperaments: action.payload
      }
    }
    case (APLHABETIACAL_ORDER): {
      const allDogs = state.allDogs;
      const orderedDogs = action.payload === 'A-Z' ?
        allDogs.sort((a, b) => {
          if(a.name.toUpperCase() > b.name.toUpperCase()) return 1
          if(b.name.toUpperCase() > a.name.toUpperCase()) return -1
          return 0
        }) 
        : allDogs.sort((a, b) => {
          if(a.name.toUpperCase() < b.name.toUpperCase()) return 1
          if(a.name.toUpperCase()> b.name.toUpperCase()) return -1
          return 0
        })
      return {
        ...state,
        allDogs: orderedDogs
      }
    }
    case (WEIGHT_ORDER): {
      const allDogs = state.allDogs;
      const orderedDogs = allDogs.sort((a, b) => {
          if(action.payload === 'heaviest') {
            return b.weight - a.weight
          } else {
            return a.weight - b.weight
          }
         })
      return {
        ...state,
        allDogs: orderedDogs
      }
    } 
    case (GET_ORIGIN_DB): {
      const dbDogs = [...state.originalDogs];
      let filteredDogs = [];
      if (action.payload === 'created'){
        filteredDogs = dbDogs.filter(d => typeof d.id === 'string');
      } else {
        filteredDogs = dbDogs.filter(d => typeof d.id === 'number');
      }
      return {
        ...state,
        allDogs: filteredDogs
      }
    }
    default: return {
      ...state
    }
  }
}

