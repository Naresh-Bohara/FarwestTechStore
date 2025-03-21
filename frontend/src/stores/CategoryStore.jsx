import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categorySvc from "../pages/category/category.service";

export const categoryCreate = createAsyncThunk("category/categoryCreate", 
    async(data, thunkAPI)=>{
        try{
            const response = await categorySvc.categoryCreate(data)
            return response;
        }catch(exception){
            throw exception
        }
    }
)

export const getCatList = createAsyncThunk(
    "category/getCatList", 
    async(data, thunkAPI)=>{
        try{
            const response = await categorySvc.getCategoryList({page: data.page, search: data.search})
            return response;
        }catch(exception){
            throw exception
        }
    }
)

const CategorySlice = createSlice({
    name: "category",
    initialState:{
        all: null,
    }, 
    reducers:{
        listAll: (state, action)=>{
        state.all = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(categoryCreate.fulfilled, (state, action)=>{

        })
        builder.addCase(categoryCreate.rejected, (state, action)=>{

        })

        builder.addCase(getCatList.fulfilled, (state, action)=>{
            state.all = action.payload.data;
        })
        builder.addCase(getCatList.rejected, (state, action)=>{
            state.all = null;
        })
    }
})

export const {listAll} = CategorySlice.actions;
export default CategorySlice.reducer;