import React from "react";
import * as style from './Nav.module.css'
import { Link } from 'react-router-dom'
import { getTemperaments,setPage } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { alphabeticalOrder, weightOrder, getOriginDB, getTemperamentsFilter, getDogByName, refreshDefaultValues,clearError } from '../../actions/index'; 

export default function Nav({ setChange }) {
  const dispatch = useDispatch();
  let temperaments = useSelector(state => state.allTemperaments);
  const tempsToFilter = useSelector(state => state.tempsToFilter)
  temperaments = temperaments ? temperaments.sort((a,b) => {
    return a.name > b.name ? 1 : -1
  }) : null
  const [filterTemps, setFilterTemps] = useState([...tempsToFilter])
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState();
  useEffect(() => {
    if(temperaments.length === 0) dispatch(getTemperaments());
  }, [dispatch])

  function orderBy(e){
    const val = e.target.value;
    if(val.includes('-')){
      dispatch(alphabeticalOrder(val))
      setChange(val)
      
      dispatch(setPage(1))
    } else {
      dispatch(weightOrder(val))
      setChange(val)
      
      dispatch(setPage(1))
    }
    setFilter()
  }
  function handleOrigin(e){
    const val = e.target.value;
    dispatch(getOriginDB(val));
    setChange(val) 
    
    dispatch(setPage(1))
  }

  function handleTemperaments(e){
    const val = e.target.value;
    if(!filterTemps.includes(val)){
      filterTemps.push(val)
      setFilterTemps(filterTemps)
    } 
    dispatch(getTemperamentsFilter(filterTemps))
    dispatch(setPage(1))
    setChange(val)
    setFilter()
  }

  function handleClickSearch(){
    dispatch(getDogByName(search));
    dispatch(setPage(1))
    setChange(search);
    setSearch('');
    setFilter()
  }

  function handleClickRefresh(){
    dispatch(refreshDefaultValues());
    dispatch(clearError())
    dispatch(setPage(1))
    setChange('')
    setFilterTemps([])
    setFilter('title')
  }

  function deleteTemperament(e){
    const newFilter = filterTemps.filter(temp => temp !== e.target.innerText)
    setFilterTemps(newFilter)
    console.log(filterTemps)
    dispatch(getTemperamentsFilter(newFilter))
  }
  return(
    <div className={`${style.navBar}`}>

      <div className={`${style.searchContainer}`}>
        <Link to = '/create'><button className={style.btns}>CREATE</button></Link>
        <input placeholder="SEARCH DOG. . ."
         value={search}   
         onChange={(e) => setSearch(e.target.value)} 
         onKeyDown={(e)=>{return (e.key==='Enter') ? handleClickSearch() : null}}
         className={style.searchInput}
        />
        <button 
          className = {style.btns}
          onClick={handleClickSearch}>
          SEARCH
        </button>
        <button 
          className={style.btns} 
          onClick={handleClickRefresh}>
          REFRESH
        </button>
      </div>

      <div className={`${style.filterContainer}`}>
         {/* DB o API */}
         <select className={`${style.filterSelec}`} onChange={handleOrigin} value={filter}>
          <option value='title' selected='defaultValue' disabled>Source</option>
          <option value='created'>Created</option>
          <option value='existing'>Existing</option>
        </select> 
        
       <select className={`${style.filterSelec}`} onChange={handleTemperaments} value={filter}>
          <option value='title' selected disabled>Temperaments</option>
           {temperaments && temperaments.map(t => {
              return <option key={t.id} value={t.name}>{t.name} </option>
           })}
        </select>
        <div>
          {/* <label>Temperaments: </label> */}
          {filterTemps.length > 0 ? 
            <div>
            { filterTemps.map(el => { return <span className={style.spanTemp} onClick={deleteTemperament}>{el}</span>})}
            </div>
          : null}   
        </div>
        
       
        
        <select className={`${style.filterSelec}`} onChange={orderBy} value={filter}>
          {/* <option selected disabled>Order By...</option> */}
          <option value='title' selected disabled>Alphabet</option>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
          <option disabled>Weight</option>
          <option value='heaviest'>Heaviest</option>
          <option value='lightest'>Lightest</option>
        </select>

        {/* <select className={`${style.filterSelec}`}  onChange={handleWeightOrder}>
          <option selected='defaultValue' disabled>Weight</option>
          <option value='heaviest'>Heaviest</option>
          <option value='lightest'>Lightest</option>
        </select> */}
      </div>
    </div>
 
  )
}