import { configureStore } from "@reduxjs/toolkit";
import dispatcherReducer from "../slices/dispatcherRequest";
// import ordenesReducer from "../slices/ordenesactivas";
// import vueltoMovementReducer from "../slices/dispatcherOfVuelto";

export default configureStore({
    reducer: {
        // ordenes: ordenesReducer,
         requestAgain: dispatcherReducer,
        // vueltoMovement: vueltoMovementReducer
    }
})