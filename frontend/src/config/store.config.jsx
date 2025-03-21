import { configureStore } from '@reduxjs/toolkit'
import CategoryReducer from "../stores/CategoryStore"

const store =  configureStore({
    reducer: {
        // configure
        category: CategoryReducer
    }
})

export default store;