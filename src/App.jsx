import React, { Component } from 'react'
import './app.scss';
import TopBar from './components/topbar/TopBar';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import {Route,Routes}  from "react-router-dom";
import Cart from './components/cart/Cart';


export default class App extends Component {
  render() {
    return (
          <div className="app">
            <TopBar/>
           
            <div className="sections"> 
              <Routes>
                <Route path="/" element={<Products/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>   
              </Routes>
            </div>
            
          </div>
          
    )
  }
}