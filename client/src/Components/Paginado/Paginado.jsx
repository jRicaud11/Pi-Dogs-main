import React from "react";
import * as style from './Paginado.module.css'



export default function Paginado({ actualPage, currentPage, totalPages, nextPage, prevPage }){

  let pages = [];

  for(let i = 1; i <= totalPages; i++){
    pages.push(i)
  }

  
  return(
      <div className={style.pagesList}>
        <nav>
          <ul className={style.pagination}>
          {pages.length > 0 && <button onClick={prevPage} className={style.moveBtn}>PREV</button>}  
          {pages && pages.map(el => {
            return <li key={el}>
                     <button key={el} 
                     className={el === currentPage ? style.selectedBtn : style.pageBtn} 
                     onClick={()=>actualPage(el)}>
                     {el}
                     </button>
                   </li>
          })}
          {pages.length > 0 && <button onClick={nextPage} className={style.moveBtn}>NEXT</button>}
          </ul>
        </nav>
      </div>
  )
}