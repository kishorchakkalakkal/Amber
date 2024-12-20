import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (categoryId) => {
      
      //const response = await fetch(`https://ambercomm.ae/backend/wp-json/wp/v2/posts?categories=${categoryId}`);
      const response = await fetch(`https://wordpress.viralfever.in/wp-json/wp/v2/posts?categories=${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
);

const worklistSlice = createSlice({
    name: 'workList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
    }
})

export default worklistSlice.reducer