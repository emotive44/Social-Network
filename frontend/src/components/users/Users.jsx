import React from 'react';

import usePagination from '../hooks/usePagination';

import Pagination from '../common/Pagination';
import CardsContainer from '../common/CardsContainer';


const Users = () => {
  const { 
    page, 
    loading, 
    fetchedData,
    countOfPages, 
    choosedPage, 
    prevPage, 
    nextPage 
  } = usePagination('users');

  return (
    <CardsContainer fetchedData={fetchedData}>
      {loading && <div>Loading....</div>}

      <Pagination 
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        choosedPage={choosedPage}
        countOfPages={countOfPages}
      />
    </CardsContainer>
  );
}

export default Users;
