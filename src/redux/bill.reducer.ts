import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CancelBill,
  UpdateStatus,
  getAllBill,
  getById,
  getCheckOutBill,
  getOneBill,
} from "../api/bill";

const intialState = {
  bill: [],
  isLoading: false,
} as { bill: []; isLoading: boolean };

// THANH TOÁN ĐƠN HÀNG

export const fetchCkeckOutBill = createAsyncThunk(
  "bill/fetchCheckoutStatus",
  async (bill) => {
    const response = await getCheckOutBill(bill);
    return response.data;
  }
);

// TẤT CẢ BILL THEO ID USER
export const fetchUserBill = createAsyncThunk(
  "bill/fetchUserBill",
  async (id: any) => {
    try {
      const response = await getOneBill(id);
      console.log(response.data);

      return response.data;
    } catch (error) {}
  }
);

// HIỂN THỊ ĐƠN HÀNG THEO ID
export const fetchBillById = createAsyncThunk(
  "produtcs/fetchBillsOne",
  async (id: any) => {
    try {
      const response = await getById(id);
      return response.data;
    } catch (error) {
      /* empty */
    }
  }
);

// HIỂN THỊ ĐƠN HÀNG

export const fetchBillAll = createAsyncThunk("bill/fetchBillAll", async () => {
  const { data } = await getAllBill();
  console.log(data.bills);
  return data.bills;
});

// CẬP NHẬT ĐƠN HÀNG
export const fetchBillUpdate = createAsyncThunk(
  "produtcs/fetchBillUpdate",
  async (body: any) => {
    try {
      const response = await UpdateStatus(body);
      return response.data;
    } catch (error) {
      /* empty */
    }
  }
);

// HỦY ĐƠN HÀNG
export const fetchCancelBill = createAsyncThunk(
  "bill/fetchCancelBill",
  async (payload, { dispatch, getState }) => {
    const { id, newStatus } = payload;

    try {
      // Gọi API để hủy đơn hàng và cập nhật trạng thái trong MongoDB
      await CancelBill(id, newStatus);

      // Gọi dispatch để cập nhật trạng thái Redux
      dispatch(fetchBillById(id)); // Bạn cần có hàm fetchBillById để lấy thông tin đơn hàng mới cập nhật

      return true; // Hoặc trả về giá trị mong muốn, ở đây là `true` nếu thành công
    } catch (error) {
      throw error;
    }
  }
);

const billSlice = createSlice({
  name: "bill",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCkeckOutBill.fulfilled, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(fetchUserBill.fulfilled, (state, action: any) => {
      state.bill = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchBillAll.fulfilled, (state, action: any) => {
      state.bill = action.payload;
      state.isLoading = false;
    });

    // UPDATE
    builder.addCase(fetchBillUpdate.fulfilled, (state) => {
      state.isLoading = false;
    });

    // CANCEL
    // HỦY ĐƠN HÀNG
    builder.addCase(fetchCancelBill.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCancelBill.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchCancelBill.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const billReducer = billSlice.reducer;
