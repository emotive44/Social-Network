import React, { useState } from 'react';
import './Users.scss';

import usePagination from '../hooks/usePagination';

import { Button, Spinner, Pagination, CardsContainer } from '../common';

const Users = () => {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const {
    page,
    loading,
    fetchedData,
    countOfPages,
    choosedPage,
    prevPage,
    nextPage,
  } = usePagination('users', search);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const searchHandler = () => {
    setSearch(value);
    choosedPage(1);
  };

  return (
    <CardsContainer fetchedData={fetchedData}>
      {loading && <Spinner />}
      <div className="search">
        <div className="search-wrapper">
          <i className="fas fa-search" />
          <input
            type="search"
            value={value}
            placeholder="Search"
            onChange={changeHandler}
          />
        </div>
        <Button
          clickHandler={searchHandler}
          style={{ display: 'inline-block' }}
        >
          Search
        </Button>
      </div>
      <Pagination
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        choosedPage={choosedPage}
        countOfPages={countOfPages}
      />
    </CardsContainer>
  );
};

export default Users;
