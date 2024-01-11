import { IOrigin } from './../models/origin';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { add, getAll, getOne, remove, update } from "../api/origin";


const initalState = {
    origin: [],
    isLoading: false
} as { origin:IOrigin[], isLoading: boolean }

// GET ALL
export const fetchOriginAll = createAsyncThunk("origin/fetchOriginAll", async () => {
    try {
        const { data } = await getAll()
        return data.origin
        
    } catch (error) { /* empty */ }
})


// Get One
export const fetchOriginOne = createAsyncThunk("origin/fetchOriginOne", async (id: any) => {
    try {
        const response = await getOne(id)
        return response.data
    } catch (error) { /* empty */ }
})

//Add
export const fetchOriginAdd = createAsyncThunk("origin/fetchOriginAdd", async (body: any) => {
    try {
        const response = await add(body)
        return response.data
    } catch (error) { /* empty */ }
})

//Delete
export const fetchOriginRemove = createAsyncThunk("origin/fetchOriginRemove", async (id: any) => {
    try {
        const response = await remove(id)
        return response.data
    } catch (error) { /* empty */ }
})

//update

export const fetchOriginUpdate = createAsyncThunk("origin/fetchOriginUpdate", async (body: any) => {
    try {
        const response = await update(body)
        return response.data
    } catch (error) { /* empty */ }
})



const Originlice = createSlice({
    name: "origin",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOriginAll.fulfilled, (state, action) => {
            state.origin = action.payload
            state.isLoading = true
        })

        //Add
        builder.addCase(fetchOriginAdd.fulfilled, (state) => {
            state.isLoading = false
        })

        //update
        builder.addCase(fetchOriginUpdate.fulfilled, (state) => {
            state.isLoading = false
        })

        //delete
        builder.addCase(fetchOriginRemove.fulfilled, (state) => {
            state.isLoading = false
        })
    },
})

export const originReducer = Originlice.reducer