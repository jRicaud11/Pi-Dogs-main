import React from "react";
import { useHistory } from "react-router-dom";
import * as style from './LandingPage.module.css'
import landing from '../../images/landing-dog.jpg'

export default function LandingPage(){
  const history = useHistory()
  function handleClick(){
    history.push("/home")
  }
  return(
    <div className={style.fullScreen}>
      <img src={landing} className={style.image}/>
      <h1 className={style.welcome}>Welcome to Henry Dogs</h1>
      <button 
        className={style.enterBtn}
        onClick={()=>history.push("/home")}>
        Enter
      </button>
      
    </div>
  )
}