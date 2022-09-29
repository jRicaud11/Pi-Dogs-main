import React from "react";
import { useHistory } from "react-router-dom";
import * as style from './LandingPage.module.css';
import github  from '../../images/subNav-gitHub.png';
import linkedin from '../../images/subNav-linkedin.png';

export default function LandingPage(){
  const history = useHistory()

  return(
    <div className={style.fullScreen}>
      <div>
        <h1 className={style.welcome}>Welcome to Henry Dogs</h1>
      </div>
        <button 
          className={style.enterBtn}
          onClick={()=>history.push("/home")}>
          Enter
        </button>
      <div className={style.aboutMe}>
        <span className={style.spanAm}>Developed By</span>
        <span className={style.spanAm}>Juan Manuel Ricaud</span>
        <div className={style.iconsContainer}>
          <a href="https://www.linkedin.com/in/juanricaud/">
            <img src={linkedin} alt='LinkedIn Link' className={style.logo}/>
          </a>
          <a href="https://github.com/jRicaud11" target="_blank">
            <img src={github} alt='GitHub Link' className={style.logo}/>
          </a>
        </div>
      </div>  
    </div>
  )
}