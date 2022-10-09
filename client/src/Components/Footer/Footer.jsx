import React from 'react'
import * as style from './footer.module.css'
import github  from '../../images/subNav-gitHub.png';
import linkedin from '../../images/subNav-linkedin.png';


export default function Footer(){

  return(
    <footer className={style.footerInfo}>
      <div className={style.containerInfo}>
        <h4>Developed by: Juan Ricaud</h4>
        <div className={style.containerLogo}>
          <a href="https://www.linkedin.com/in/juanricaud/" target="_blank">
            <img src={linkedin} alt='LinkedIn Link' className={style.logo}/>
          </a>
          <a href="https://github.com/jRicaud11" target="_blank">
            <img src={github} alt='GitHub Link' className={style.logo}/>
          </a>
        </div>  
        {/* <p>Copyright © 2022</p> */}
      </div>
    </footer>
  )
}