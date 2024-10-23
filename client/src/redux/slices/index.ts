import { combineReducers } from "@reduxjs/toolkit";
import { kanbanReducer } from "./kanbanSlice";



const rootReducers = combineReducers({
kanbanReducer
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;
