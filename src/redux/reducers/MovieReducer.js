import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api"

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  detailInfo: {},
  genreList: {},
  error: null,
  loading: true,
  currentPage: 1,
  movieTotal: {},
}
const API_KEY=process.env.REACT_APP_API_KEY;

export const AxiosMovies = createAsyncThunk('movies', async (currentPage=1, thunkApi)=>{
  try {
    const popularApi = api.get(`/movie/popular?api_key=${API_KEY}&language=ko&region=kr&page=${currentPage}`);
    const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=ko&region=kr&page=1`);
    const upcomingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=ko&region=kr&page=1`);
    const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko&region=kr`);
    const totalApi = api.get(`/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`)
    let [popularMovies, topRatedMovies, upcomingMovies, genreList, movieTotal] = await Promise.all([popularApi, topRatedApi, upcomingApi, genreApi, totalApi]);
    console.log(movieTotal)
    return {
      popularMovies: popularMovies.data,
      topRatedMovies: topRatedMovies.data, 
      upcomingMovies: upcomingMovies.data,
      genreList: genreList.data.genres,
      movieTotal: movieTotal.data,
      currentPage: currentPage,
    }
  } catch(error){
    thunkApi.rejectWithValue(error.message)
  }
})

const moviesSlice = createSlice({
  name: "movie",
  initialState,
  reducers:{
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  },
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
      state.currentPage = action.payload.currentPage; 
      state.movieTotal = action.payload.movieTotal;
    })
    .addCase(AxiosMovies.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }
})

export const movieActions = moviesSlice.actions; // 액션 내보내기
export default moviesSlice.reducer;
