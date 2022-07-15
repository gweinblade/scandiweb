import React, { Component } from 'react'
import next from '../../assets/next.svg'
import previous from '../../assets/previous.svg'
export default class Carousel extends Component {

    state ={
        
        number : 0
    }
    mod = (n, m) => {
        return ((n % m) + m) % m;
      }
    next =(gallery) =>{
        const  newnumber = this.mod((this.state.number + 1 ),gallery.length ); 
        this.setState({number : newnumber});
        
       
    }
    previous =(gallery) =>{
        const  newnumber = this.mod((this.state.number - 1 ),gallery.length ); 
        this.setState({number : newnumber});
        
    }

    render() {
      let gallery = this.props.gallery;
      
        return (
            <div className="carousel">
               
               <img src={gallery[ this.state.number]} alt="" className='imagesitem' />
   
          
               
               <img src={previous} alt="" className="previous" onClick={()=> this.previous(gallery)} />
               <img src={next} alt="" className="next" onClick={()=> this.next(gallery)} />
            
            
    
          </div>
        )
      }
}
