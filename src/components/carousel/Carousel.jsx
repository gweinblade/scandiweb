import React, { Component } from 'react'

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
   
          
            
               
            <button onClick={()=> this.previous(gallery)} className="previous"  >{"<"}</button>
            <button onClick={()=> this.next(gallery)} className="next" > {">"}</button>
    
          </div>
        )
      }
}
