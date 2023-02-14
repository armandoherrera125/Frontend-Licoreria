import { createSlice } from "@reduxjs/toolkit";
export const dispatcherSlice = createSlice({
    name: 'idEdit',
    initialState: 0,
    reducers: {
        setID: (state, action) => {
            return action.payload;
        }

    },
})
export const {setID} = dispatcherSlice.actions;
export default dispatcherSlice.reducer;