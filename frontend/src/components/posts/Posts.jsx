import React from 'react';

import usePagination from '../hooks/usePagination';

import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination';
import CardsContainer from '../common/CardsContainer';


const Posts = () => {
  const { 
    page, 
    loading, 
    fetchedData,
    countOfPages, 
    choosedPage, 
    prevPage, 
    nextPage 
  } = usePagination('posts');

  return (
    <CardsContainer fetchedData={fetchedData}>
      {loading && <Spinner style={{ marginTop: '1rem' }} />}

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

export default Posts;
