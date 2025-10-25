import { configureStore } from '@reduxjs/toolkit'
import CategoryReducer from "../stores/CategoryStore"
import CartReducer from "../stores/cart.store"

const store =  configureStore({
    reducer: {
        // configure
        category: CategoryReducer,
        cart:CartReducer
    }
})

export default store;