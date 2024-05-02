import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api"

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  detailInfo: {},
  genreList: {},
  error: null,
  loading: true
}
const API_KEY=process.env.REACT_APP_API_KEY;

export const AxiosMovies = createAsyncThunk('movies', async (id, thunkApi)=>{
  try {
    const popularApi = api.get(`/movie/popular?api_key=${API_KEY}&language=ko-kr&page=1`);
    const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=ko-kr&page=1`);
    const upcomingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=ko-kr&page=1`);
    const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko-kr`);
    let [popularMovies, topRatedMovies, upcomingMovies, genreList] = await Promise.all([popularApi, topRatedApi, upcomingApi, genreApi]);
    return {
      popularMovies: popularMovies.data,
      topRatedMovies: topRatedMovies.data, 
      upcomingMovies: upcomingMovies.data,
      genreList: genreList.data.genres,
    }
  } catch(error){
    thunkApi.rejectWithValue(error.message)
  }
})

const moviesSlice = createSlice({
  name: "movie",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
    .addCase(AxiosMovies.pending, (state)=>{
      state.loading = true;
    })
    .addCase(AxiosMovies.fulfilled, (state, action)=>{
      state.loading = false;
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topRatedMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.genreList = action.payload.genreList;
    })
    .addCase(AxiosMovies.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }
})

export const movieActions = moviesSlice.actions;
export default moviesSlice.reducer;