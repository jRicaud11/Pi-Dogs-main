import React from 'react'
import style from './DogDetail.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetail, clearInfo, deleteDog, clearError } from '../../actions/index'
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loadings.jsx'

export default function Detail(props){
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const dogDetail = useSelector(state => state.dogDetail);
  const errorMsg = useSelector(state => state.errorMsg)
  const history = useHistory();
  const [confirmBox, setConfirmbox] = useState(false);
  const [success, setSuccess] = useState(false);
  let temperament = dogDetail.temperament || dogDetail.temperaments
  temperament = temperament ? temperament.split(', ') : null;

  useEffect(() => {
    dispatch(getDogDetail(id))

    return ()=> dispatch(clearInfo())
  }, [dispatch, id])

  function handleClick() {
    history.push("/home");
  }
  
  function handleDelete(){
    // dispatch(deleteDog(id));
    setConfirmbox(true)
    // history.push("/home")
  }

  function denyDelete(){
    setConfirmbox(false)
    history.push("/home")
  }

  function acceptDelete(){
    dispatch(deleteDog(id))
    setConfirmbox(false)
    setSuccess(true) 
  }

  function successfullDelete(){
    setSuccess(false)
    dispatch(clearError())
    history.push("/home")
  }
  return(
    <>
    {!dogDetail.id ? <Loading /> : 
    <div className={style.dogContainer}>
      <div className={style.dogCard}>
        <div className={style.btnContainer}>
          <button className={style.btBack} onClick={handleClick}>
            Home
          </button> 
          {typeof dogDetail.id === 'string' ? <button className={style.delete} onClick={handleDelete}>Delete</button> : null}
        </div>
        <h1>{dogDetail.name}</h1>
        <img src={dogDetail.image} alt={`Dog ${dogDetail.name}`}/>
        <div className={style.containerDetails}>
          <h3>Height: </h3><span>{`${dogDetail.height} CM`}</span>
          <h3>Weight: </h3><span>{`${dogDetail.weight} KG`}</span>
          <h3>Life Span: </h3><span>{`${dogDetail.life_span} Years`}</span>
        </div>
        <div className={style.temperamentContainer}>
          {temperament && temperament.map(t => {
            return (
              <span key={t}>{t}</span>
            )
          })}
        </div>
      </div>
    </div>
    }
    {confirmBox && <div className={style.confirmationBox}>
      <h2>{`Are you sure you want to delete the race ${dogDetail.name} ?`}</h2>
      <div className={style.confirmationContainer}>
        <button className={`${style.confirmBtn} ${style.denied}`} onClick={denyDelete}>NO</button>
        <button className={`${style.confirmBtn} ${style.confirmed}`} onClick={acceptDelete}>YES</button>
      </div>
    </div>}
    {success && <div className={style.successContainer}>
      <h2>{errorMsg}</h2>
      <button className={`${style.confirmBtn} ${style.confirmed}`} onClick={successfullDelete }>Ok</button>
    </div>}
    </>
  )
}

