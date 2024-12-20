import { configureStore } from "@reduxjs/toolkit"
import workListReducer from './worklist'
import mousePosReducer from "./mousePos"

export const store = configureStore({
    reducer : {
        works : workListReducer,
        mousePos: mousePosReducer
    }
})