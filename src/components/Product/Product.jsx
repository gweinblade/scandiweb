import React, { Component } from 'react'
import { gql } from '@apollo/client';
import {  useParams } from "react-router-dom";
import { useDispatch,useSelector} from 'react-redux';
import './product.scss'
import {Query} from "@apollo/client/react/components"
import {productquery} from '../../queries'
import { Interweave } from 'interweave';

class Product extends Component {
  state = {
    currentImage: null ,
    color :null,
    size :null,
    array :[]
  }
  setimage =(x) => {
    this.setState({ currentImage : x})
  }
  setcolor =(x) => {
    this.setState({ color : x})
  }
  setsize =(x) => {
    this.setState({ size : x})
  }
  btnSubmit =(product,dispatch,) =>{
   
    const item = {...product , NewAtt :this.state.array}
    
        dispatch({
          type : "cart/addToCart",
          payload: item
          })
  }
  recheck = e => {
        let att = {name : e.target.name, value : e.target.value }
        
        
        const duplicate =  this.state.array.filter(e => e.name === att.name) 
        if (duplicate.length > 0) {
          let array2 = this.state.array
          array2 = array2.filter(e => e.name !== att.name) 
          this.setState({array : [...array2,att]})
        }
        else {
         this.setState({
          array : [...this.state.array,att]
         })
        }

        
  }
  render() {
      const curent = this.props.redux
      const dispatch =this.props.dispatch
      const {id} =this.props.params
     
    
     
    return (
      
      <Query query={gql`${productquery}`}  variables={ {
          "productId": id
      }}>
      {({loading,data}) => {
        if (loading) return 'loading';
        let product; 
        if(!Array.isArray(data.product)){
        product=[data.product];
        }
       return (
            product.map(({id,brand,category,gallery,prices,name,attributes,description,inStock}) => <div className='product'>
            <div className="gallery">
            {gallery.map((image) => <img src={image} className="sideimage" alt="" onClick={()=> this.setimage(image)}/>)}
            </div>
            <div className={inStock ? "" : "outofstock"}>
            <img className='mainpic' src={this.state.currentImage===null ? gallery[0] : this.state.currentImage} alt=""/>
            </div>
           
            <div className="details">
            <h2 className='brand' >{brand}</h2>
            <h2 className='name' >{name}</h2>
            <form >
            {attributes.map(({id,type,items})=> <div className='attributes'>
            <h2 className='productattributeid'>{id} :</h2>
            <div className='attribute'>
            {items.map(({value})=> 
            {return type==="text" ? <div className='group'> <input className='group' type="radio" id={value+id}   value={value} name={id} onChange={this.recheck} required/><label htmlFor={value+id} className={type} >{value}</label> </div>:  
            <div className='group'> <input type="radio" id={value+id}  className='group'  value={value} name={id} onChange={this.recheck} required/><label htmlFor={value+id} className={type} style={{backgroundColor : value}} ></label>  </div>
            }

            )}</div>
            </div>
            )}
            
            {prices.filter(({amount,currency}) => currency.symbol === curent  ).map(({amount,currency}) => <div><h3 >PRICE :</h3><h2 className='productprice'>{currency.symbol}{amount}</h2></div>)}
            <input type="button" value="Add to cart" className={`submitbtn ${inStock ? "" : "outofstockbtn"}` }onClick={() => inStock && this.btnSubmit(product,dispatch)} />
            </form>
            
              
              <Interweave  content={description} className='description'/>
            </div> 
            </div>)
       )
      }

      }
      </Query>
    

    )
  }
}
// eslint-disable-next-line
export default (props) => (
  <Product
      {...props}
      redux = {useSelector(state => state.currency.symbol)}
      dispatch = {useDispatch()}
      params = {useParams()}
     

/>)