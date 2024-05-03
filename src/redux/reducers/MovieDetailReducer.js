import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api"

const initialState = {
  movieDetail: {},
  movieReviews: {},
  relatedMovies: {},
  trailer: {},
  loading: true,
  error: null,
  showReviews: true, 
  showRelatedMovies: false, 
}
const API_KEY=process.env.REACT_APP_API_KEY;

export const AxiosMovieDetail = createAsyncThunk('movieDetail', async (id, thunkApi)=>{
  try {
    const movieDetailApi = api.get(`/movie/${id}?api_key=${API_KEY}&language=ko-kr`);
    const movieReviewApi = api.get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    const movieRelatedApi = api.get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=ko-kr&page=1`)
    const trailerApi = api.get(`movie/${id}/videos?api_key=${API_KEY}&language=ko-kr`)
    let [movieDetail, movieReviews, relatedMovies, trailer] = await Promise.all([movieDetailApi, movieReviewApi, movieRelatedApi, trailerApi]);
    return {
      movieDetail: movieDetail.data,
      movieReviews: movieReviews.data,
      relatedMovies: relatedMovies.data,
      trailer: trailer.data,
    }
  } catch(error){
    thunkApi.rejectWithValue(error.message)
  }
})

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers:{
    setShowReviews(state, action) { 
      state.showReviews = action.payload;
    },
    setShowRelatedMovies(state, action) { 
      state.showRelatedMovies = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AxiosMovieDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(AxiosMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload.movieDetail;
        state.movieReviews = action.payload.movieReviews;
        state.relatedMovies = action.payload.relatedMovies;
        state.trailer = action.payload.trailer;
      })
      .addCase(AxiosMovieDetail.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const detailAction = detailSlice.actions;
export default detailSlice.reducer;