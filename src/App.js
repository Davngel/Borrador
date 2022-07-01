import './App.css';
import React from 'react'
import Footer from './components/footer';
import  {Header}  from './components/header/Header';
import { Home } from './pages/Home';
import ProductList from './components/productList';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPageResults from './components/search';
import ShoppingCarPage from './components/shoppingCarPage';
import CheckoutPage from './components/checkoutPage';


function App() {

  return (
    <>
      <Header 
      titulo={'MUEBLES TRONCOSO'}
      />

      <Routes>    
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/product/:productId' element={<ProductDetailPage />}/>
        <Route path='/search' element={<SearchPageResults />}/>
        <Route path='/cart' element={<ShoppingCarPage />}/>
        <Route path='/checkout' element={<CheckoutPage />}/>
      </Routes>
      
      <Footer/>
    </>
    
  );
}

export default App;
