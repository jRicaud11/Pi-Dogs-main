import React from "react";
import * as style from './loading.module.css'
import loading from '../../images/loading2.gif'
export default function Loading(){
  return(
   
    <div className={style.loaderContainer}>
      <img className={style.loader} src={loading} alt='Loading'/>
      <h4>Loading...</h4>
    </div>
    
  )
}