import { createSlice } from "@reduxjs/toolkit";

import { Cart } from "../../../types/cart.type";

interface CartsState {
  cart: Cart[];
  openModal: boolean;
}

const initialState: CartsState = {
  cart: [],
  openModal: false,
};

const cartSystem = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index === -1) {
        const temp = {
          ...action.payload,
          totalCount: action.payload.price,
          numberCount: 1,
        };

        return {
          ...state,
          cart: [...state.cart, temp],
        };
      }
    },
    RemoveCart: (state, action) => {
      const newArr = state.cart.filter(
        (item) => item._id !== action.payload.id
      );
      state.cart = newArr;
    },
    RemoveCartLogout: (state) => {
      state.cart = [];
      state.openModal = false;
    },
    UpdateNumberCount: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index >= 0) {
        state.cart[index].numberCount = action.payload.numberCount;
        state.cart[index].totalCount =
          action.payload.numberCount * state.cart[index].price;
      }
    },
    OpenModalCart: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export const {
  AddCart,
  RemoveCart,
  UpdateNumberCount,
  OpenModalCart,
  RemoveCartLogout,
} = cartSystem.actions;
export default cartSystem.reducer;
