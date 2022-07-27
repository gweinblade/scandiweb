import React, { Component } from 'react'
import {gql} from "@apollo/client";
import './products.scss'
import {useSelector,useDispatch} from "react-redux"
import { NavLink } from 'react-router-dom';
import {Query} from "@apollo/client/react/components"
import addcart from '../../assets/addcart.svg'
import {productsquery} from '../../queries'

 
 class Products extends Component {

   check = (product,dispatch) => {
    let newproduct = null; 
    let att =[];
    let con = null;
    if(!product.inStock ) return false
    if(!Array.isArray(product)){
      newproduct=[product];
    }

    newproduct.map(({attributes})=> 
    // eslint-disable-next-line
    attributes.map(({name,items})=> 
    { con = {name : name , value : items[0].value};
      att.push(con);  
    }
    )
    )
    const item = {...newproduct , NewAtt :att}
    
        dispatch({
          type : "cart/addToCart",
          payload: item
          })
     
  }

  render() {
    const curent = this.props.redux_symbol;
    const ac = this.props.redux_name;
    const dispatch = this.props.dispatch;
    return (
      <div className="products" id="products">
        <h2>{ac}</h2>
        <Query   query={gql`${productsquery}`}  variables={ {
        "input": {
          "title": ac
        }
}}>
            {({loading,data,error}) => {
             
              if (loading) return 'loading';
              if (error) return <p>Error :</p>;

              return ( 

                <div className="row">
                {data.category.products.map((product) => (
                  <div className="product">
                   
                  <NavLink to={`/product/${product.id}`} className={`card ${product.inStock ? "": "outofstockproducts" }`} key={product.id}>     
                    <img src={product.gallery[0]} className="img" alt={product.name} />
                    <h5 className="title">{product.brand} {product.name}</h5>
                    <h4 className='price'>{product.prices.filter(({amount,currency}) => currency.symbol === curent  ).map(({amount,currency}) => 
                    <p> {currency.symbol}  {parseFloat(amount).toFixed(2)}</p>)}</h4>         
                  </NavLink>
                   <div  className="goplp" onClick={()=> this.check(product,dispatch)}><img src={addcart} alt="" /></div> 
                  
                  </div>
                            
           ) )} </div> )}}
        </Query>
        </div>
     
    )
  }
}

// eslint-disable-next-line
export default (props) => (
  <Products
      {...props}
      redux_symbol = {useSelector(state => state.currency.symbol)}
      redux_name = {useSelector(state => state.active.name)}
      dispatch = {useDispatch()}
/>)



