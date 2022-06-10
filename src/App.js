import './App.css';
import React,{useState} from 'react'
import Footer from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import styled from 'styled-components'
import ProductList from './components/productList/ProductList';

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
        {setNave(true);
        }


  return (
    <div>
      <Header 
      titulo={'MUEBLES TRONCOSO'}
      returnHome={returnHome}
      />
      {nave ? (<Home/>) : (<ProductList/>)}
      <ButtonProducts onClick={changePath}>{nave ? `View all products`: `Main`}</ButtonProducts>
      <Footer/>
    </div>
    
  );
}

export default App;