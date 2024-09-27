import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/orders/all");
      if (res.data.message) {
        Alert.alert(`${res.data.message}`);
        return { allOrdersArray: [] };
      }
      return res.data.allOrdersArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setActiveOrder = createAsyncThunk(
  "orders/setActiveOrder",
  async (order, thunkAPI) => {
    try {
      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const archiveOrder = createAsyncThunk(
  "orders/archiveOrder",
  async (_id, thunkAPI) => {
    try {
      const response = await axios.post("/orders/archive", { _id });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    activeItem: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, handlePending)
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchAllOrders.rejected, handleRejected)
      .addCase(setActiveOrder.fulfilled, (state, action) => {
        state.activeItem = action.payload;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
