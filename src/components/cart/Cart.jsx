import React, { Component } from 'react'
import { useDispatch,useSelector} from 'react-redux';
import './cart.scss'
import Carousel from '../carousel/Carousel';


class Cart extends Component {

   
 increase = (product , dispatch) => {
  
  dispatch({ type : "cart/addToCart",
              payload: product })
 }
 decrease = (product , dispatch) => {
  
  dispatch({ type : "cart/removefromcart",
              payload: product })
 }
 emptycart = (dispatch) => {
  dispatch({ type : "cart/emptycart" })
 }

 checked = (id,value2,list)=>{

       const found =list.findIndex(({name,value})=> value===value2 && name===id  )
      
       if(found >= 0 ) return true
       else return false
        
   }
totalamount =(cart,symbol) => {

  let total = cart.reduce((accumulator,product)=> 
  accumulator + parseFloat(( product[0].prices.filter(({amount,currency}) => currency.symbol === symbol  ).map(({amount,currency}) => amount *  product["cartQuantity"] )  )),0
  )
return parseFloat(total).toFixed(2);
}

  render() {
    const symbol =this.props.redux_symbol;
    const cart =this.props.redux_cart;
    const totalcart =this.props.redux_total;
    const dispatch = this.props.dispatch;
    return (
      <div className='cartpage'>
        <h1>Cart</h1>
        <div className='productscart'>

            

        {
          cart.map((product)=> 
         
          <div className='productcart'>
           
            <div className="left">
            <h2 className='brandcart'>{product[0].brand}</h2>
            <h2 className='namecart' >{product[0].name}</h2>
            { product[0].prices.filter(({amount,currency}) => currency.symbol === symbol  ).map(({amount,currency}) => <h2 className='amountitem' >{currency.symbol}{amount} </h2>) } 

            {product[0].attributes.map(({id,type,items})=> <div className='attributescart'>
            <h2 className='attributesname'>{id}:</h2>
            <div className='attributecart'>
            {items.map(({value})=>
                      
            {
              return type==="text" ? <p className={`attributes_text ${this.checked(id,value,product["NewAtt"]) ? "checked" : ""}`}>{value}</p>   :  
             <p className={`attributes_color ${this.checked(id,value,product["NewAtt"]) ? "checked" : ""}`} style={{backgroundColor : value}} ></p>  
            }
            )}</div>
            </div>
            )}

            </div>
            <div className="right">
              <div className="numbers">
                <p className='increase' onClick={()=> this.increase(product,dispatch)}>
                  +
                </p>
                <p className='itemnumber'>
                  {product["cartQuantity"]}
                </p>
                <p className='decrease' onClick={()=> this.decrease(product,dispatch)}>

               -
               </p>
              </div>
              { product[0].gallery.length >1 ? <Carousel gallery ={product[0].gallery}  /> :<div className="carousel">  <img src={product[0].gallery[0]} alt="" className='imagesitem' /></div> }
             
            </div>    
          </div>
          )
        }
        </div>
        <div className="info">
        <h3>Tax 21%: </h3>  <h2>  {symbol}{parseFloat(this.totalamount(cart,symbol) * 0.21).toFixed(2)} </h2> 
        </div>
        <div className="info">
        <h3>Quantity:</h3><h2>{totalcart}</h2> 
          </div>
          <div className="info">
          <h3>Total:</h3> <h2> {symbol}{this.totalamount(cart,symbol)} </h2>
          </div>
        
        
        
        
        <button className='order'> ORDER</button>
      </div>
    )
  }
}

// eslint-disable-next-line
export default (props) => (
  <Cart
      {...props}
      redux_symbol = {useSelector(state => state.currency.symbol)}
      redux_cart = {useSelector(state => state.cart.cartItems)}
      redux_total = {useSelector(state => state.cart.cartTotalQuantity)}
      dispatch = {useDispatch()}
/>)