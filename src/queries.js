export const productsquery =  `query type($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        brand
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            displayValue
            id
            value
            
          }
         
        }
        prices {
          amount
          currency {
            label
            symbol
            
          }
          
        }
        
      }
      
    }
  }
         `;


export const productquery = `query type($productId: String!) {
  product(id: $productId) {
    brand
    category
    description
    gallery
    id
    attributes {
      id
      name
      type
      items {
        displayValue
        id
        value
      }
    }
    inStock
    prices {
      amount
      currency {
        label
        symbol
      
      }
     
    }
    
    name
  }
}

   
 `

 export const categoryquery = `query type {categories{name}}`
 export const currencyquery = `query type {currencies{label symbol}}`
 export default productquery ;