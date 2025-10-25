import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartSvc from "../pages/cart/cart.service";

export const getMyCartItems = createAsyncThunk(
  "cart/getMyCartItems",
  async () => {
    try {
      const response = await cartSvc.getCartItems();
      let totalItems = 0;
      if (response?.detail) {
        response.detail.map((cartItem) => {
          totalItems += cartItem.quantity;
        });
        return {
          cart: response.detail,
          counter: totalItems,
        };
      } else {
        return {
          cart: null,
          counter: 0,
        };
      }
    } catch (exception) {
      throw exception;
    }
  }
);

const CartSlicer = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    counter: 0,
  },
  reducers: {
    resetCart: (state) => {
      state.cart = null;
      state.counter = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyCartItems.fulfilled, (state, action) => {
      const { cart, counter } = action.payload;
      state.cart = cart;
      state.counter = counter;
    });
    builder.addCase(getMyCartItems.rejected, (state) => {
      state.cart = null;
      state.counter = 0;
    });
  },
});

export const { resetCart } = CartSlicer.actions;
export default CartSlicer.reducer;
