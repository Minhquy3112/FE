import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { add, getAll, getOne, remove, update } from "../api/products";
import { IProducts } from "../models/products";

const initalState = {
    product: [],
    isLoading: false
} as { product:IProducts[], isLoading: boolean }

// GET ALL
export const fetchProductsAll = createAsyncThunk("produtcs/fetchProductsAll", async () => {
    try {
        const { data } = await getAll()
        return data.product
        
    } catch (error) { /* empty */ }
})


// Get One
export const fetchProductsOne = createAsyncThunk("produtcs/fetchProductsOne", async (id: any) => {
    try {
        const response = await getOne(id)
        return response.data
    } catch (error) { /* empty */ }
})

//Add
export const fetchProductsAdd = createAsyncThunk("produtcs/fetchProductsAdd", async (body: any) => {
    try {
        const response = await add(body)
        return response.data
    } catch (error) { /* empty */ }
})

//Delete
export const fetchProductsRemove = createAsyncThunk("produtcs/fetchProductsRemove", async (id: any) => {
    try {
        const response = await remove(id)
        return response.data
    } catch (error) { /* empty */ }
})

//update

export const fetchProductsUpdate = createAsyncThunk("produtcs/fetchProductsUpdate", async (body: any) => {
    try {
        const response = await update(body)
        return response.data
    } catch (error) { /* empty */ }
})



const productSlice = createSlice({
    name: "product",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAll.fulfilled, (state, action) => {
            state.product = action.payload
            state.isLoading = true
        })

        //Add
        builder.addCase(fetchProductsAdd.fulfilled, (state) => {
            state.isLoading = false
        })

        //update
        builder.addCase(fetchProductsUpdate.fulfilled, (state) => {
            state.isLoading = false
        })

        //delete
        builder.addCase(fetchProductsRemove.fulfilled, (state) => {
            state.isLoading = false
        })
    },
})

export const productReducer = productSlice.reducer