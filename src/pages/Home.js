import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosMovies } from '../redux/reducers/MovieReducer';
import Banner from '../components/Banner';
import MovieSlide from '../components/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const {popularMovies, topRatedMovies, upcomingMovies, loading} = useSelector(state => state.movie)
  // console.log(popularMovies)
  useEffect(()=>{
    dispatch(AxiosMovies())
  }, [])
  // loading이 true 면 로딩스피너를 보여주고
  // loading이 false 면 데이터를 보여주고
  
  // true : 데이터 도착전
  // false : 데이터 도착 후, 에러가 났을 때
  if (loading){
    return <ClipLoader color="#ffff" loading={loading} size={150} aria-label="Loading Spinner"/>
  }
  return (
    <div>
      {/* {popularMovies.results && <Banner movie={popularMovies.results[1]} />} */}
      <Banner movie={popularMovies.results[0]} />
      <div style={{padding : '50px'}}>
        <h1>popular Movies</h1>
        <MovieSlide movies={popularMovies} />
        <h1>topRated Movies</h1>
        <MovieSlide movies={topRatedMovies} />
        <h1>upcoming Movies</h1>
        <MovieSlide movies={upcomingMovies} />
      </div>
    </div>
  )
}

export default Home