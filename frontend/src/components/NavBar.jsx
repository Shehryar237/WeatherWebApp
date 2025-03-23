import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Untitled-3.png/';

function NavBar({children}) {
    return (
      <Wrapper>     
        <S_BarLower>
          <S_Logo>
              <p>{children}</p>
          </S_Logo>
          <S_Navigation>
            <ul>
              <li>SadSky</li>
            </ul>
          </S_Navigation>
        </S_BarLower>
      </Wrapper>
    )
  }
  
  const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    font-size: 0.9rem;
    width: 100%;
    color:lightgray;
  `
  const S_BarLower = styled.div`
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: baseline;
    background-color:white;
    border-bottom:1px solid #282830 ;
    margin: 0;
    font-size: 1.4rem;
    padding:0px 0px 16px 24px ;
    background-color: #100f13;    
    position: sticky;
    top: 0; 
    z-index: 1000; 
  `
  const S_Logo = styled.div`
    margin: 0px;
    padding: 0px;
    font-weight: bold;
    font-size: 1.rem;

    p{
      margin: 0;
    }

  `
  const S_Navigation = styled.div`
    display: flex;
    flex-grow: 1;
    padding-right: 20px;
    justify-content: center;
    //border  :1px solid blue ;
  
  ul{
      list-style-type: none;
      display: flex;
      justify-content: space-evenly; 
      width: 80%;
   
    }
  li{
      display: flex;
      align-items: center;
      cursor: pointer;  
      transition: background-color 0.3s ease; 
      border-radius: 5px; 
      //border: 1px solid blue;
      padding:0px 10px 0px 10px ;
      margin-left: -40px;
      img{
        height: 35px;
        margin: 0;
      }
  }
  `
  
  export default NavBar
  