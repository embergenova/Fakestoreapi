import {createStore } from 'vuex'

export default createStore({
  state:{
        products:[],
        limit:3,
        details:{
            id:'',
            title:'',
            category:'',
            description:'',
            price:'',
            image: '',
            rating:{
                rate:0,
                count:0
            }
        },
        basket:{},
        category:['0']
   },
   getters:{
        getProducts:state => state.products,
        getLimit:state => state.limit,
        getDetails:state => state.details,
        getBasket:state =>Object.values(state.basket),
        getCategory:state =>state.category

   },
   mutations:{
        SET_PRODUCTS(state,value){
           state.products=value
        },
        SET_LIMIT(state,value){
           state.limit=value
        },
        SET_DETAILS(state,value){
            state.details=value
        },
        SET_BASKET(state,item){
         if(state.basket[item.id]){
            state.basket[item.id].quantity++
         }else{
            state.basket={
               ...state.basket,
               [item.id]:{...item,quantity:1}
            }
         }
        },
        SET_CATEGORY(state,value){
         state.category=value
        },
        SET_CATEGORY_PRODUCTS(state,value){
         state.products=value
        },
        SET_DECREASE_CARD(state,itemID){
           if(state.basket[itemID].quantity>1){
            state.basket[itemID].quantity--
           }else{
            delete state.basket[itemID]
           }
        },
        SET_INCREASE_CARD(state,itemID){
         state.basket[itemID].quantity++
        }, 
        SET_DELETE_CARD(state,itemID){
         delete state.basket[itemID]
        },
   },
   actions:{
      cardDecrease({commit},itemID){
         commit('SET_DECREASE_CARD',itemID)
      },
      cardIncrease({commit},itemID){
         commit('SET_INCREASE_CARD',itemID)
      },
      cardDelete({commit},itemID){
         commit('SET_DELETE_CARD',itemID)
      },
      addToBasket({commit},data){
         commit('SET_BASKET',data)
      },
      fetchSearchProducts({commit}, str) {
         fetch('https://fakestoreapi.com/products')
         .then(res=>res.json())
         .then(json=> {
            const data=json.filter(item=>item.title.includes(str))
             commit('SET_PRODUCTS', data)
         })
     },
      fetchCategoryProducts({commit}, payload) {
         fetch(`https://fakestoreapi.com/products/category` + payload[0])
             .then(res=>res.json())
             .then(json=> {
                 if (payload[1] === '0') {
                     commit('SET_CATEGORY_PRODUCTS', json)
                 }
                 if (payload[1] === '5') {
                     const data = json.sort( (a, b) => a.price - b.price)
                     commit('SET_CATEGORY_PRODUCTS', data)
                 }
                 if (payload[1] === '10') {
                     const data = json.sort( (a, b) => b.price - a.price)
                     commit('SET_CATEGORY_PRODUCTS', data)
                 }
             })
     },
      fetchCategory({commit}){
         fetch('https://fakestoreapi.com/products/categories')
         .then(res=>res.json())
         .then(json=>commit('SET_CATEGORY',json))
      },
     fetchProducts({commit}, payload){
       fetch(`https://fakestoreapi.com/products?limit=`+payload[0])
       .then(res => res.json())
       .then(json => {
         if(payload[1]==='0'){
            commit('SET_PRODUCTS',json)
         }
         if(payload[1]==='5'){
            const data=json.sort((a,b)=>a.price-b.price)
            commit('SET_PRODUCTS',data)
         }
         if(payload[1]==='10'){
            const data=json.sort((a,b)=>b.price-a.price)
            commit('SET_PRODUCTS',data)
         }
       })
     },
     fetchDetails({commit},id){
        fetch(`https://fakestoreapi.com/products/` +id)
        .then(res => res.json())
        .then(json =>{
             commit('SET_DETAILS',json)
        })
     }
   }
})