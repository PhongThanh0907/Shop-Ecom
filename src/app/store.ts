import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import cartSlice from "./features/cart/cartSlice";

const userConfig = {
  key: "user",
  whitelist: ["isLoggedIn", "token", "userInfo"],
  storage,
};

const productConfig = {
  key: "product",
  storage,
};

const cartConfig = {
  key: "cart",
  storage,
};

export const store = configureStore({
  reducer: {
    product: persistReducer(productConfig, productSlice),
    user: persistReducer(userConfig, userSlice),
    cart: persistReducer(cartConfig, cartSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
