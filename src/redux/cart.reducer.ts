import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteProductCart,
  getCartUser,
  updateProductCart,
} from "../api/cart";
import { IAddToCart } from "../models/cart";

interface initialState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: any;
  isLoading: boolean;
}

const initialState: initialState = {
  cart: {},
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCartByUser: any = createAsyncThunk(
  "cart/getCartUser",
  async () => {
    const { data } = await getCartUser();
    console.log(data);
    
    return data.cart;
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addProductToCart: any = createAsyncThunk(
  "cart/addToCart",
  async (dataCart: IAddToCart) => {
    const { data } = await addToCart(dataCart);

    return data.cart;
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProductToCart: any = createAsyncThunk(
  "cart/updateProductCart",
  async (dataCart: IAddToCart) => {
    const { data } = await updateProductCart(dataCart);

    return data.cart;
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteProductToCart: any = createAsyncThunk(
  "cart/deleteProductCart",
  async (productId: string) => {
    const { data } = await deleteProductCart(productId);

    return data.cart;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCartByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartByUser.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartByUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Add To Cart
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.isLoading = false;
      })
      // Update Product To Cart
      .addCase(updateProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProductToCart.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete Product Cart
      .addCase(deleteProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteProductToCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const cartReducer =cartSlice.reducer;
