import { createSlice ,configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

function compare (one , two){
    if(one.length === two.length){
    let containsAll1 = one.every(elem => two.find(el => el.name === elem.name && el.value === elem.value));
    return containsAll1;}
    else return false
}

const cartactive =createSlice({
    name: "cartactive",
    initialState :{
        cartactive : false
    },
    reducers: {
        changeactive :(state) =>{
            state.cartactive = !state.cartactive
        }
    }
})


const cartslice =createSlice({
    name: "cart",
    initialState: {
        cartItems :[],
        cartTotalQuantity :0,
       
    },
    reducers: {
        addToCart :(state,action) =>{
            const newItem = action.payload
            const duplicateitem = state.cartItems.findIndex((e) => e[0].id === newItem[0].id && compare(e["NewAtt"],newItem["NewAtt"])  )
            //console.log("here is the id ",duplicateitem)
            if (duplicateitem >=0){            
                state.cartItems[duplicateitem].cartQuantity +=1 ;
                state.cartTotalQuantity += 1;
            }
            else {
                const temp = {
                    ...action.payload,cartQuantity :1
                }
                state.cartItems.push(temp);
                state.cartTotalQuantity += 1
            }           
        },
        removefromcart : (state,action)=>{
            const newItem = action.payload
            const duplicateitem = state.cartItems.findIndex((e) => e[0].id === newItem[0].id && compare(e["NewAtt"],newItem["NewAtt"])  )
            if (duplicateitem >=0){
                if(state.cartItems[duplicateitem].cartQuantity>1 ) {
                    state.cartItems[duplicateitem].cartQuantity -=1 ;
                    state.cartTotalQuantity -= 1;
                }
                else {
                    
                    state.cartItems.splice(duplicateitem,1);
                    state.cartTotalQuantity -= 1;
                }           
                
            }
            
        },
        emptycart : (state) =>{
                state.cartItems.length = 0;
                state.cartTotalQuantity = 0;
        }

    }
})

const activeCat = createSlice({
    name: "active",
    initialState : {
        name :"all"},
    reducers : {
        changecat: (state,action) => {
            state.name =    action.payload
        }
    }
})





const currency = createSlice({
    name: "currency",
    initialState : {
        symbol: "$"},
    reducers : {
        changecurrency: (state,action) => {
            state.symbol =   action.payload
        }
    }
})


//const reducers = combineReducers({active: activeCat.reducer,currency : currency.reducer });
//const persistedReducer = persistReducer(persistConfig, reducers);

const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const reducer = combineReducers({
      active : activeCat.reducer,
      currency : currency.reducer,
      cart :cartslice.reducer,
      cartactive : cartactive.reducer
      
  });
  
  const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({

    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

