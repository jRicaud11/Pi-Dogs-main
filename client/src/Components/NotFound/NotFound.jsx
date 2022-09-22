import React from "react";
import notFoundImg from '../../images/notFound.png'
import { useSelector } from 'react-redux'
import * as style from './notFound.module.css'

export default function NotFound(){
  const error = useSelector(state => state.errorMsg)
  return(
    <div className={style.containerNF}>
      <h1>{error || 'NO DOG MATCHES THE FILTERS'}</h1>
      <img src={notFoundImg} alt='Not Found'/>
    </div>
  )
}