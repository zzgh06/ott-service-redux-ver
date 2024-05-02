import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ item }) => {
  const {genreList} = useSelector(state => state.movie);
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/movies/${item.id}`)
  }
  return (
    <div className='movie-card' onClick={()=> showDetail()}>
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt='movie poster' />
      <div className='overlay'>
        <div style={{fontSize:'20px'}}>{item.title}</div>
        <div>{item.genre_ids.map(id => 
          <Badge style={{marginRight : '5px'}} bg="danger">{genreList.find(item => item.id === id).name}</Badge>
          )}
        </div>
        <div>
          <span style={{marginRight:'5px'}}>평점 : {(item.vote_average).toFixed(2)}</span>
          <span>관람연령 : {item.adult ? "청불" : "Under 18"}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard