import { createSlice } from "@reduxjs/toolkit";
export const dispatcherSlice = createSlice({
    name: 'requestAgain',
    initialState: 0,
    reducers: {
        addProduct: (state) =>{
           return state+1;
        }

    },
})
export const {addProduct} = dispatcherSlice.actions;
export default dispatcherSlice.reducer;