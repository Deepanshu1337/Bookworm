import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  showNotification: false,
};

const updateLocalStorage = (userId, items) => {
  if (userId) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
      state.showNotification = state.items.length > 0;
      updateLocalStorage(action.payload.userId, state.items);
    },
    addItem(state, action) {
      const { userId, bookId } = action.payload;
      const existingItem = state.items.find((item) => item.bookId === bookId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.showNotification = true;
      updateLocalStorage(userId, state.items);
    },
    removeItem(state, action) {
      const { itemId, userId } = action.payload;
      state.items = state.items.filter((item) => item.bookId !== itemId);
      state.showNotification = state.items.length > 0;
      updateLocalStorage(userId, state.items);
    },
    decreaseItem(state, action) {
      const { itemId, userId } = action.payload;
      const existingItem = state.items.find((item) => item.bookId === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.bookId !== itemId);
        }
      }
      state.showNotification = state.items.length > 0;
      updateLocalStorage(userId, state.items);
    },
    clearCart(state, action) {
      const { userId } = action.payload;
      // const finalUserId = String(userId);
      // console.log(finalUserId);
      state.items = [];
      state.showNotification = false;
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      }
    },
  },
});

export const { setCartItems, addItem, removeItem, decreaseItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
