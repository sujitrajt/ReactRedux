import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from "./features/aplSlice";
export const store = configureStore({
    reducer:{
        [productsApi.reducerPath] : productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
})

setupListeners(store.dispatch)