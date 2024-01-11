import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../models/category";
import { add, getAll, getOne, remove, update } from "../api/category";

const initalState = {
  category: [],
  isLoading: false,
} as { category: ICategory[]; isLoading: boolean };

export const fetchCategoriesAll = createAsyncThunk(
  "categories/fetchCategoriesAll",
  async () => {
    try {
      const { data } = await getAll();
      return data.categories;
    } catch (error) {}
  }
);

export const fetchCategoriesOne = createAsyncThunk(
  "categories/fetchCategoriesOne",
  async (id: any) => {
    try {
      const response = await getOne(id);
      return response.data;
    } catch (error) {}
  }
);

export const fetchCategoriesAdd = createAsyncThunk(
  "categories/fetchCategoriesAdd",
  async (body: any) => {
    try {
      const response = await add(body);
      return response.data;
    } catch (error) { /* empty */ }
  }
);

export const fetchCategoriesRemove = createAsyncThunk(
  "categories/fetchCategoriesRemove",
  async (id: any) => {
    try {
      const response = await remove(id);
      return response.data;
    } catch (error) {}
  }
);

export const fetchCategoriesUpdate = createAsyncThunk(
  "categories/fetchCategoriesUpdate",
  async (body: any) => {
    try {
      const response = await update(body);
      return response.data;
    } catch (error) {}
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAll.fulfilled, (state, action) => {
      state.category = action.payload;
      state.isLoading = true;
    });

    builder.addCase(fetchCategoriesAdd.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchCategoriesRemove.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchCategoriesUpdate.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const categoryReducer = CategorySlice.reducer;