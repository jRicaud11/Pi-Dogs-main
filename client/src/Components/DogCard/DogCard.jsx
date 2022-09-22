import React from 'react';
import * as style from './DogCard.module.css'
import { Link } from 'react-router-dom'
export default function DogCard(props) {
  const temperaments = props.temperament ? props.temperament.split(', ') : undefined
  
  return(
    <div className={style.container}>
      <div className={style.dogInfo}>
        <div className={style.name}>
          <h1 className={style.title}>{props.name}</h1>
        </div>
        <Link to={`/dogs/${props.id}`} className={style.link}>
          <img className={style.image} src={props.img} alt={`Race ${props.name}`}/>
        </Link>
       <div className={style.weight}>
          <p>Average Weight: {props.weight} Kg</p>
        </div>
        <div className={style.temperament}>
          {temperaments && temperaments.map(el => {
            return <p key={el}>{el}</p>
          })}
        </div>
      </div>
    </div>




    // <Link to={`/dogs/${props.id}`} className={`${style.cardContainer}`}>
    //     <div className={`${style.cardContainer}`}>
    //       <div className={`${style.dogCard}`}>
    //         <div className={`${style.imgContainer}`}>
    //           <img className={`${style.imgDog}`} src={props.img} alt={`Race ${props.name}`} />
    //         </div>
    //         <h3 className={`${style.title}`}>{props.name}</h3>
    //         <div className={`${style.listTemperaments}`}>
    //           {temperaments && temperaments.map(el => {
    //             return <span key={el}>{el}</span>
    //           })}
    //         </div>
    //         <label>Average Weight: </label>  <strong>{`${props.weight} KG`}</strong>
    //       </div>
    //     </div>
    // </Link>  
  )
}
