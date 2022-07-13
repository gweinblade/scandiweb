import React, { Component } from 'react'
import { useDispatch,useSelector} from 'react-redux';
import './minicart.scss'
import Carousel from '../carousel/Carousel';
import PortalReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom';


class MiniCart extends Component {

   
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
//console.log("totale = ",total)
return parseFloat(total).toFixed(2);
}

  render() {
    const symbol =this.props.redux_symbol;
    const cart =this.props.redux_cart;
    const totalcart =this.props.redux_total;
    const dispatch = this.props.dispatch;
    let portal= document.getElementById('portal');

    return PortalReactDOM.createPortal (
      <>
      <div className='overlay'/>
      <div className='minicart'>
        <p><b>My Bag </b> {totalcart} items</p>
        <div className='productsminicart'>

            

        {
          cart.map((product)=> 
         
          <div className='productminicart'>
           
            <div className="leftmini">
            <h2 className='brandcart'>{product[0].brand}</h2>
            <h2 className='namecart' >{product[0].name}</h2>
            { product[0].prices.filter(({amount,currency}) => currency.symbol === symbol  ).map(({amount,currency}) => <h2 className='amountitem' >{currency.symbol}{amount} </h2>) } 

            {product[0].attributes.map(({id,type,items})=> <div className='attributesminicart'>
            <h2 className='attributesname'>{id}:</h2>
            <div className='attributecart'>
            {items.map(({value})=>
                      
            {
              return type==="text" ? <p className={`attributes_text ${this.checked(id,value,product["NewAtt"]) ? "checked" : ""}`}>{value}</p>   :  
             <p className={`attributes_color ${this.checked(id,value,product["NewAtt"]) ? "checkedcolor" : ""}`} style={{backgroundColor : value, color : value}} ></p>  
            }
            )}</div>
            </div>
            )}

            </div>
            <div className="rightmini">
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
        
          <div className="infomini">
          <h3>Total:</h3> <h2> {symbol}{this.totalamount(cart,symbol)} </h2>
          </div>
        
        
          <div className="infomini">
         
          <NavLink className='view'  to="/cart"  onClick={()=> this.props.setclickcart(false)}>         
             <span> VIEW BAG  </span>
           </NavLink>
          <button className='order'> CHECK OUT</button>
          </div>
        
        
      </div>
      </>
     ,portal
    )
  }
}

// eslint-disable-next-line
export default (props) => (
  <MiniCart
      {...props}
      redux_symbol = {useSelector(state => state.currency.symbol)}
      redux_cart = {useSelector(state => state.cart.cartItems)}
      redux_total = {useSelector(state => state.cart.cartTotalQuantity)}
      dispatch = {useDispatch()}
/>)