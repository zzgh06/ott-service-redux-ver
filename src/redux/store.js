import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./reducers/MovieReducer";
import detailSlice from "./reducers/MovieDetailReducer";
let store = configureStore({
  reducer: {
    movie: moviesSlice,
    detail: detailSlice,
  }
})

export default store