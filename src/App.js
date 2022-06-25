import './App.css';
import React,{useContext, useState, useEffect} from 'react'
import Footer from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import styled from 'styled-components'
import ProductList from './components/productList/ProductList';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import SearchPageResults from './components/buscar/SearchPageResults';

const ButtonProducts = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 16px 0;
  margin: 10px 0;
  background-color: #8a817c;
  color: black;
  font-size: 18px;
  cursor: pointer;
`;

function App() {

  const [nave, setNave] = useState(true);

  const changePath = () => {
    setNave(prevChecK => !prevChecK);
  }

  const returnHome = ()=>
        setNave(true);
  
        
  return (
    <>

          <Header 
          titulo={'MUEBLES TRONCOSO'}
          returnHome={returnHome}
          />

      <Routes>    
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/product/:productId' element={<ProductDetailPage/>}/>
        <Route path='/search' element={<SearchPageResults />}/>
      </Routes>

      
      <Link to={`${nave ? '/products': '/home'}`}>
      <ButtonProducts onClick={changePath}>{nave ? `View all products`: `Main`}</ButtonProducts>
      </Link>
      <Footer/>
    </>
    
  );
}

export default App;
