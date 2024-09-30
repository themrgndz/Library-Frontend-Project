import React from 'react'
import Card from '../Cart/Card.jsx';

const Container = () => {
  return (
    <div className="container">
          <div className="CategoryDiv">
          </div>
          <div className= "card-container">
            <Card 
              imageSrc="https://marketplace.canva.com/EAFQE7XNmsw/1/0/1003w/canva-lacivert-minimalist-kelebek-u%C3%A7-kitap-kapa%C4%9F%C4%B1-tpBdl9y5rlw.jpg"
              title="Book 1"
              description="A brief description of this book will appear here."
              stock={5}
              buttonText="Details"
            />
            <Card 
              imageSrc="https://marketplace.canva.com/EAFH1JlujwI/2/0/1003w/canva-ye%C5%9Fil-sade-gizemli-orman-foto%C4%9Frafl%C4%B1-roman-kitap-kapa%C4%9F%C4%B1-mfPVe9UxMO0.jpg"
              title="Book 1"
              description="A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. A brief description of this book will appear here. "
              stock={5}
              buttonText="Details"
            />
            <Card 
              imageSrc="https://marketplace.canva.com/EAEe1W_Hods/1/0/1024w/canva-tek-renkli-gerilim-wattpad-kapa%C4%9F%C4%B1-Wcatv-Oosb0.jpg"
              title="Book 1"
              description="A brief description of this book will appear here."
              stock={5}
              buttonText="Details"
            />
            <Card 
              imageSrc="https://static-cse.canva.com/blob/1708256/1024w-Ud9dNR2wsng.jpg"
              title="Book 1"
              description="A brief description of this book will appear here."
              stock={5}
              buttonText="Details"
            />
            <Card 
              imageSrc="https://marketplace.canva.com/EAD51V3O7Hg/1/0/1003w/canva-beyaz-gece-g%C3%B6ky%C3%BCz%C3%BC-otobiyografi-kitap-kapa%C4%9F%C4%B1-byiM1lwz9y0.jpg"
              title="Book 1"
              description="A brief description of this book will appear here."
              stock={5}
              buttonText="Details"
            />
            <Card 
              imageSrc="https://marketplace.canva.com/EAFCpY6Lz2E/1/0/1003w/canva-cad%C4%B1-kitap-kapa%C4%9F%C4%B1-_O41H90NVvU.jpg"
              title="Book 1"
              description="A brief description of this book will appear here."
              stock={5}
              buttonText="Details"
            />
            <Card 
              imageSrc="https://marketplace.canva.com/EAFJV3O0K3o/1/0/1003w/canva-siyah-beyaz-ve-koyu-sar%C4%B1-do%C4%9Fa-hakk%C4%B1nda-roman-i%CC%87ll%C3%BCstrasyon-ve-tipografik-kitap-kapa%C4%9F%C4%B1-h1wRXxi71eg.jpg"
              title="Book 1"
              description="A brief description of this book will appear here."
              stock={5}
              buttonText="Details"
            />
          </div>
        </div>
  )
}

export default Container