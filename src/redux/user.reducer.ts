import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/user";
import { getAll, getOne, remove, update } from "../api/user";

const initalState = {
  user: [],
  isLoading: false,
} as { user: IUser[]; isLoading: boolean };

export const fetchUsersAll = createAsyncThunk(
  "users/fetchUsersAll",
  async () => {
    try {
      const { data } = await getAll();
      return data.users;
    } catch (error) {}
  }
);

export const fetchUserOne = createAsyncThunk("produtcs/fetchUserOne", async () => {
  try {
      const response = await getOne()
      console.log(response);
      
      return response.data
  } catch (error) { /* empty */ }
})

// export const fetchCategoriesOne = createAsyncThunk(
//   "categories/fetchCategoriesOne",
//   async (id: any) => {
//     try {
//       const response = await getOne(id);
//       return response.data;
//     } catch (error) {}
//   }
// );


export const fetchUsersRemove = createAsyncThunk(
  "users/fetchUsersRemove",
  async (id: any) => {
    try {
      const response = await remove(id);
      return response.data;
    } catch (error) {}
  }
);

export const fetchUsersUpdate = createAsyncThunk(
  "users/fetchUsersUpdate",
  async (body: any) => {
    try {
      const response = await update(body);
      return response.data;
    } catch (error) {}
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAll.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = true;
    });

    builder.addCase(fetchUsersRemove.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchUsersUpdate.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const userReducer = userSlice.reducer;