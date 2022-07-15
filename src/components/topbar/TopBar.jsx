import React, { Component  } from 'react'
import {gql} from "@apollo/client";
import { useDispatch,useSelector} from 'react-redux';
import './topbar.scss'
import { NavLink } from 'react-router-dom'
import {Query} from "@apollo/client/react/components"
import cart from '../../assets/cart.svg'
import logo from '../../assets/logo.svg'
import MiniCart from '../minicart/MiniCart';
import {currencyquery,categoryquery} from '../../queries'





class TopBar extends Component {
  state = {
    currencyref : false ,
    cartref:false,
    wrappercartref : React.createRef(),
    wrapperRef : React.createRef(),
    
  }
  
  
  componentDidMount = () =>{
    document.addEventListener("mousedown", this.handleClickOutsidecurrency);   
  }

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutsidecurrency);
}

  setclickcurrency =(x) => {
    this.setState({ currencyref : x})
  }
  setclickcart =(x) => {
    this.setState({ cartref : x})
  }

  handleClickOutsidecurrency = (event) =>{
    if (this.state.wrapperRef && !this.state.wrapperRef.current.contains(event.target) && this.state.currencyref) {
      this.setState( { currencyref : false})
      
    }
  }
 
 
  render() {
    const dispatch = this.props.dispatch
    const current_symbol = this.props.redux_symbol
    const current_category = this.props.redux_currenct
    const cart_total= this.props.redux_total_cart

    return (
      <div className='topbar'>
        <nav>

        <Query query={gql`${categoryquery}`}>
        {({loading,data,error}) => {
        if (loading) return 'loading';
        if (error)   return 'error';
        return data.categories.map(({name}) => (
          // eslint-disable-next-line
             <NavLink key={name.id} className={`link ${name ===current_category ? "act": ""}`} to="/" onClick={() => dispatch({
                  type : "active/changecat",
                  payload: name})}>{name} </NavLink> 
              ));}}
        </Query>
        </nav>
        <img className='logo' alt='' src={logo}/>
        <div ref={this.state.wrapperRef} >
        <Query query={gql`${currencyquery}`}>
        {({loading,data,error}) => {
        if (loading) return 'loading';
        if (error)   return 'error';
        return (<div className='currencychanger'>
          {/* eslint-disable-next-line*/}
          <a href='#' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className={this.state.currencyref ? "notactive" : "active"} onClick={() => this.setclickcurrency(!this.state.currencyref)}>{current_symbol}</a>
          <div>
          { this.state.currencyref  && data.currencies.map(({label,symbol}) => (  
          // eslint-disable-next-line
          <a  href='#' key={label} onClick={() => (dispatch({
          type : "currency/changecurrency",
          payload: symbol})// eslint-disable-next-line
          ,this.setclickcurrency(false))}
          className={(current_symbol===symbol) ? "border" :""} >{symbol}{label}</a>))}</div> </div>);}}
        </Query>
        </div>
        

        <div className={cart_total > 0 ? "cart" : "emptycart"} ref={this.state.wrappercartref} value={cart_total} onClick={() => this.setclickcart(!this.state.cartref)}  >
        <img alt='' className='image_cart' src={cart}/>



          
      
         </div>
         
        

          {this.state.cartref ?<MiniCart cartref={this.state.cartref} cartbuttonref={this.state.wrappercartref} setclick={this.setclickcart} />  :""}
         

           
        </div>
    )
  }
}


// eslint-disable-next-line
export default (props) => (
  <TopBar
      {...props}
      redux_symbol = {useSelector(state => state.currency.symbol)}
      redux_currenct = {useSelector(state => state.active.name)}
      redux_total_cart = {useSelector(state => state.cart.cartTotalQuantity)}
      dispatch = {useDispatch()}
/>)