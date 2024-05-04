import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api"

const initialState = {
  searchList: {},
}
const API_KEY = process.env.REACT_APP_API_KEY;

export const AxiosMovieSearch = createAsyncThunk('movie/search', async (searchQuery, thunkApi)=>{
  try {
    // api 주소 방식을 정확하게 지키자 ^^
    const searchListApi = await api.get(`/search/movie?language=ko&region=kr&query=${searchQuery}&api_key=${API_KEY}`);
    return searchListApi.data;
    
  } catch(error){
    thunkApi.rejectWithValue(error.message)
  }
})

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(AxiosMovieSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(AxiosMovieSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchList = action.payload;

      })
      .addCase(AxiosMovieSearch.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;