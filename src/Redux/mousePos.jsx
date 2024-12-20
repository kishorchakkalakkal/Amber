import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    x: 0,
    y: 0
}

const mousePos = createSlice({
    name: 'mousePos',
    initialState,
    reducers: {
        setMousePos: ( state, action ) => {
            state.x = action.payload.x;
            state.y = action.payload.y;
        }
    }
})

export const { setMousePos } = mousePos.actions

export default mousePos.reducer