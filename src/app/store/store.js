import { configureStore } from "@reduxjs/toolkit";
import gameLogicReducer from "../features/gamelogicSlice"

export const store = configureStore({
    reducer:{
        gameLogic:gameLogicReducer,
    }
})