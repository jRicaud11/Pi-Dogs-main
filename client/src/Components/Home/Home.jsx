import React from 'react';
import DogCard from '../DogCard/DogCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDogs, setPage} from '../../actions/index';
import * as style from './Home.module.css'
import Nav from '../NavBar/Nav'
import Paginado from '../Paginado/Paginado.jsx'
import Loading from '../Loading/Loadings.jsx'
import NotFound from '../NotFound/NotFound.jsx';


export default function Home() {
  const dispatch = useDispatch()
  const dogs = useSelector(state => state.allDogs);
  const error = useSelector(state=> state.errorMsg);
  const [change, setChange] = useState()
  

  //paginado
  const dogsPerPage = 8;
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useSelector(state => state.currentPage)
  const lastIndex = currentPage * dogsPerPage; //8-16-24-...
  const firstIndex = lastIndex - dogsPerPage; //0-8-16-... 
  const totalPages = Math.ceil(dogs.length / dogsPerPage)
  const dogsToShow = dogs.slice(firstIndex, lastIndex);


  const actualPage = (number) =>{
    dispatch(setPage(number))
    // setCurrentPage(number)
  }

  const nextPage = () => {
    if(currentPage >= totalPages) return;
    dispatch(setPage('up'))
    
    // setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if(currentPage === 1) return;
    dispatch(setPage('down'))
    // setCurrentPage(currentPage - 1)
  }

  useEffect(()=>{
    if(dogs.length === 0) dispatch(getDogs())
  },[dispatch])
   
  return(
     <div className={style.cover}>
      {/*setCurrentPage={setCurrentPage}*/}
     <Nav setChange={setChange} change={change}/> 
    {(change && dogs.length === 0) || (error) ? <NotFound />
     : totalPages < 1 ? <Loading /> 
     : <>
        <Paginado actualPage={actualPage} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} totalPages={totalPages} /> 
        <div className={`${style.container}`}>
          
            {dogsToShow && dogsToShow.map(el => 
              <DogCard 
              key={el.id}
              id={el.id}
              name={el.name}
              height={el.height}
              weight={el.weight}
              life_span={el.life_span}
              img={el.image}
              temperament={el.temperament || el.temperaments}
              />
            )}
        </div>
       </>
       }
      </div>
  )
}

 