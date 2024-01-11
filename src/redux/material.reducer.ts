import { IMaterial } from './../models/material';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { add, getAll, getOne, remove, update } from "../api/material";


const initalState = {
    material: [],
    isLoading: false
} as { material:IMaterial[], isLoading: boolean }

// GET ALL
export const fetchMaterialAll = createAsyncThunk("material/fetchMaterialAll", async () => {
    try {
        const { data } = await getAll()
        return data.material
        
    } catch (error) { /* empty */ }
})


// Get One
export const fetchMaterialOne = createAsyncThunk("material/fetchMaterialOne", async (id: any) => {
    try {
        const response = await getOne(id)
        return response.data
    } catch (error) { /* empty */ }
})

//Add
export const fetchMaterialAdd = createAsyncThunk("material/fetchMaterialAdd", async (body: any) => {
    try {
        const response = await add(body)
        return response.data
    } catch (error) { /* empty */ }
})

//Delete
export const fetchMaterialRemove = createAsyncThunk("material/fetchMaterialRemove", async (id: any) => {
    try {
        const response = await remove(id)
        return response.data
    } catch (error) { /* empty */ }
})

//update

export const fetchMaterialUpdate = createAsyncThunk("material/fetchMaterialUpdate", async (body: any) => {
    try {
        const response = await update(body)
        return response.data
    } catch (error) { /* empty */ }
})



const Materiallice = createSlice({
    name: "material",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMaterialAll.fulfilled, (state, action) => {
            state.material = action.payload
            state.isLoading = true
        })

        //Add
        builder.addCase(fetchMaterialAdd.fulfilled, (state) => {
            state.isLoading = false
        })

        //update
        builder.addCase(fetchMaterialUpdate.fulfilled, (state) => {
            state.isLoading = false
        })

        //delete
        builder.addCase(fetchMaterialRemove.fulfilled, (state) => {
            state.isLoading = false
        })
    },
})

export const materialReducer = Materiallice.reducer