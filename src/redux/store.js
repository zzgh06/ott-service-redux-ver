import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./reducers/MovieReducer";
import detailSlice from "./reducers/MovieDetailReducer";
import searchSlice from "./reducers/MovieSearchReducer";
let store = configureStore({
  reducer: {
    movie: moviesSlice,
    detail: detailSlice,
    search: searchSlice,
  }
})

export default store