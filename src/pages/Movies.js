import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  const {popularMovies} = useSelector(state => state.movie)
  return (
    <div className='movies-container'>
      <div>

      </div>
      <div className='movies-wrap'>
        {popularMovies.results.map(item => (
          <MovieCard item={item} content={'movies'} />
          ))
        }
      </div>
    </div>
  )
}

export default Movies