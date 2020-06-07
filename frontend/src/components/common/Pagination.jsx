import React from 'react';
import './Pagination.scss';

import Button from './Button';


const Pagination = ({ prevPage, nextPage, page, choosedPage, countOfPages }) => {
  return (
    <div className="pagination">
      <Button
        danger
        clickHandler={prevPage}
        style={{'margin': '0'}}
      >
        Previous
      </Button>

      <div>
        {countOfPages.map((p,i) => {
          return <span 
            key={i} 
            onClick={() => choosedPage(p)}
            className={page === p ? 'active' : null}
          >
            {p}
          </span>
        })}
      </div>
      
      <Button
        primary
        clickHandler={nextPage}
        style={{'margin': '0'}}
      >
        Previous
      </Button>
    </div>
  );
}

export default Pagination;
