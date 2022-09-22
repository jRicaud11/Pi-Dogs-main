import React from "react";
import * as style from './Nav.module.css'
import { Link } from 'react-router-dom'
import { getTemperaments } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { alphabeticalOrder, weightOrder, getOriginDB, getTemperamentsFilter, getDogByName, refreshDefaultValues,clearError } from '../../actions/index'; 

export default function Nav({ setChange, setCurrentPage }) {
  const dispatch = useDispatch();
  let temperaments = useSelector(state => state.allTemperaments);
  temperaments = temperaments ? temperaments.sort((a,b) => {
    return a.name > b.name ? 1 : -1
  }) : null
  
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    if(temperaments.length === 0) dispatch(getTemperaments());
  }, [dispatch])

  function handleFilterAlphabetical(e){
    const val = e.target.value
    dispatch(alphabeticalOrder(val))
    setChange(val)
    setCurrentPage(1)
  }

  function handleWeightOrder(e){
    const val = e.target.value;
    dispatch(weightOrder(val))
    setChange(val)
    setCurrentPage(1)
  }

  function handleOrigin(e){
    const val = e.target.value;
    dispatch(getOriginDB(val));
    setChange(val) 
    setCurrentPage(1)
  }

  function handleTemperaments(e){
    const val = e.target.value;
    dispatch(getTemperamentsFilter(val))
    setChange(val)
    setCurrentPage(1)
  }

  function handleClickSearch(){
    dispatch(getDogByName(search));
    setChange(search);
    setSearch('');
    setCurrentPage(1)
  }

  function handleClickRefresh(){
    dispatch(refreshDefaultValues());
    dispatch(clearError())
    setChange('')
  }

  
  return(
    <div className={`${style.navBar}`}>

      <div className={`${style.searchContainer}`}>
        <Link to = '/create'><button className={style.btns}>CREATE</button></Link>
        <input placeholder="SEARCH"
         value={search}   
         onChange={(e) => setSearch(e.target.value)} 
         onKeyDown={(e)=>{return (e.key==='Enter') ? handleClickSearch() : null}}
         className={style.searchInput}
        />
        <button className = {style.btns} onClick={handleClickSearch}>SEARCH</button>
        <button className={style.btns} onClick={handleClickRefresh}>REFRESH</button>
      </div>

      <div className={`${style.filterContainer}`}>
        <select className={`${style.filterSelec}`} onChange={handleTemperaments}>
          <option selected='defaultValue' disabled>Temperaments</option>
           {temperaments && temperaments.map(t => {
              return <option key={t.id} value={t.name}>{t.name}</option>
           })}
        </select>

        {/* DB o API */}
        <select className={`${style.filterSelec}`} onChange={handleOrigin}>
          <option selected='defaultValue' disabled>Source</option>
          <option value='created'>Created</option>
          <option value='existing'>Existing</option>
        </select> 

        <select className={`${style.filterSelec}`} onChange={handleFilterAlphabetical}>
          <option selected='defaultValue' defaultValue disabled>Alphabetical</option>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
        </select>

        <select className={`${style.filterSelec}`}  onChange={handleWeightOrder}>
          <option selected='defaultValue' disabled>Weight</option>
          <option value='heaviest'>Heaviest</option>
          <option value='lightest'>Lightest</option>
        </select>
      </div>
    </div>
 
  )
}