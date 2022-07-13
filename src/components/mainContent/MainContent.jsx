import React, { Component } from 'react'


 


export default class MainContent extends Component {


    state = {
        count : 0
    }

    HandleCount = (product) => {
        console.log(product);
        this.setState( { count : this.state.count + 1});
    };
  render() {
  
    return (
      <div className='maincontent'>
        <div>
            <h1>{this.state.count}</h1>
        </div>
        <div>
            <button onClick={() => this.HandleCount({id : 1})}>Increment</button>
        </div>
      </div>
    )
  }
}
