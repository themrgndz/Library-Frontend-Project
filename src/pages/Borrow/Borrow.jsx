import React from 'react';
import { useParams } from 'react-router-dom'; // useParams'i ekle
import BorrowMain from '../../components/Borrow/BorrowMain/BorrowMain';
import './borrow.css';

const Borrow = () => {
  const { bookId } = useParams();

  return (
    <>
      <div className='BorrowBody'>
        <div className='BorrowMain container'>
          <BorrowMain bookId={bookId} /> 
        </div>
      </div>
    </>
  );
};

export default Borrow;
