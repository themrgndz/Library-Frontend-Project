import React from 'react'
import BorrowPanel from '../../components/Borrow/BorrowPanel/BorrowPanel'
import BorrowNavbar from '../../components/Borrow/BorrowNavbar/BorrowNavbar'
import Footer from '../../components/Homepage/Footbar/Footer'
import './BorrowPage.css'

const BorrowPage = () => {
  return (
    <>
      <div className='PageBorrow'>
        <div className='Borrow'>
          {/*-------------------------------------------------------------------------------------*/}
          <nav>
            <BorrowNavbar />
          </nav>
          {/*-------------------------------------------------------------------------------------*/}
          <div className='container'>
            <BorrowPanel />
          </div>
          {/*-------------------------------------------------------------------------------------*/}
          <footer className="footer-container">
            <Footer />
          </footer>
          {/*-------------------------------------------------------------------------------------*/}
        </div>
      </div>
    </>
  )
}

export default BorrowPage
