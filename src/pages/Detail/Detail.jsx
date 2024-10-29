import React from 'react'
import BookMain from '../../components/Detail/BookMain/BookMain'
import Footer from '../../components/Homepage/Footbar/Footer'
import './Detail.css'

const Detail = () => {
  return (
    <>
      <div className='Detail'>
        <div className='container'>
          <BookMain/>
        </div>
      </div>
    </>
  )
}

export default Detail