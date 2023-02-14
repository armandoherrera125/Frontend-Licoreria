import { configureStore } from "@reduxjs/toolkit";
import dispatcherReducer from "../slices/dispatcherRequest";
import IDsetter from "../slices/IDsetter";
// import ordenesReducer from "../slices/ordenesactivas";
// import vueltoMovementReducer from "../slices/dispatcherOfVuelto";

export default configureStore({
    reducer: {
        // ordenes: ordenesReducer,
         requestAgain: dispatcherReducer,
        IdEdit: IDsetter
    }
})