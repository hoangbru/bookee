import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
  Middleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { cartReducer } from "../slices/Cart";

import authApi, { authReducer } from "../api/auth";
import productApi, { productReducer } from "../api/product";
import categoryApi, { categoryReducer } from "../api/category";
import orderApi, { orderReducer } from "../api/order";
import orderDetailApi, { orderDetailReducer } from "../api/order-detail";
import userApi, { userReducer } from "../api/user";
import statisticApi, {statisticReducer} from "../api/statistic";
import reviewApi, { reviewReducer } from "../api/review";

const persistconfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  [authApi.reducerPath]: authReducer,
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,
  [orderApi.reducerPath]: orderReducer,
  [orderDetailApi.reducerPath]: orderDetailReducer,
  [userApi.reducerPath]: userReducer,
  [statisticApi.reducerPath]: statisticReducer,
  [reviewApi.reducerPath] : reviewReducer
});

const persistedReducer = persistReducer(persistconfig, rootReducer);

const middleware: Middleware[] = [
  authApi.middleware,
  productApi.middleware,
  categoryApi.middleware,
  orderApi.middleware,
  orderDetailApi.middleware,
  userApi.middleware,
  statisticApi.middleware,
  reviewApi.middleware
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);
