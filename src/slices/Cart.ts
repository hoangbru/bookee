import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    items: []
} as { items: any[] }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<any>) => {
            const newProduct = action.payload;
            const existProductIndex = state.items.findIndex((item: any) => item.id == newProduct.id);
            if (existProductIndex === -1) {
                state.items.push(newProduct)
            } else {
                state.items[existProductIndex].quantity++;
            }
        },
        increase: (state, action: PayloadAction<number>) => {
            state.items.find((item: any) => item.id === action.payload).quantity++;
        },
        decrease: (state, action: PayloadAction<number>) => {
            const currentProduct = state.items.find((item: any) => item.id === action.payload)
            currentProduct.quantity--;
            if (currentProduct.quantity < 1) {
                currentProduct.quantity = 1
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            const currentProduct = state.items.find((item: any) => item.id === action.payload);
            currentProduct.quantity = 0
            if(currentProduct.quantity == 0) {
                state.items = state.items.filter((item:any) => item.id !== action.payload)
            }
        },
        clear: (state) => {
            state.items.map((item:any) => item.quantity = 0)
            state.items = state.items.filter((item:any) => item.quantity !== 0)
        }
    }
})
export const { add, increase, decrease, remove, clear } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;