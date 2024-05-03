import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// 배운점 : props 를 통해 전달된 값을 기반으로 보여줄 내용을 변경

// 컴포넌트를 재사용하여 디자인을 다르게 보여주는 방법
// 1. Props를 활용하여 스타일을 변경: 새로운 props를 추가하여 해당 props에 따라 스타일을 변경
// 2. CSS 클래스를 조건부로 적용: className을 조건부로 설정하여 다른 CSS 클래스를 적용
// 3. 하위 컴포넌트 재사용: MovieCard 내부에서 재사용 가능한 하위 컴포넌트를 사용하여 디자인을 다르게 할 수 있다
// 4. 복합 컴포넌트 생성: 새로운 컴포넌트를 만들지 않고도 여러 컴포넌트를 조합하여 새로운 디자인을 만들 수 있다
const MovieCard = ({ item, content }) => {
  const {genreList} = useSelector(state => state.movie);
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/movies/${item.id}`)
  }
  return (
    <div className='movie-card' onClick={()=> showDetail()}>
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt='movie poster' />
        {content === 'movieSlide' && (
          <div className='overlay'>
            <div style={{fontSize:'20px'}}>{item.title}</div>
            <div>{item.genre_ids.map((id, index) => 
              <Badge key={index} style={{marginRight : '5px'}} bg="danger">{genreList.find(item => item.id === id).name}</Badge>
              )}
            </div>
            <div>
              <span style={{marginRight:'5px'}}>평점 : {(item.vote_average).toFixed(2)}</span>
              <span>관람연령 : {item.adult ? "청불" : "Under 18"}</span>
            </div>
          </div>
        )}
        {content === 'movies' && (
          <div className='movies'>
            <div style={{display : 'flex'}}>
              <img style={{width:'50px', paddingRight:'10px'}} src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt='' />
              <div>
                <h5>{item.title}</h5>
                <span>{item.release_date.slice(0, 4)}</span>
              </div>
            </div>
            <div>{item.genre_ids.map((id, index) => 
              <Badge key={index} style={{marginRight : '5px'}} bg="danger">{genreList.find(item => item.id === id).name}</Badge>
              )}
            </div>
            <div style={{fontSize:'9px'}}>
              {item.overview ? item.overview : ''}
            </div>
            <div style={{fontSize:'10px', fontWeight:'600'}}>
              <span>평점 {(item.vote_average).toFixed(2)} </span>
              <span>관람인원 {(item.popularity)}</span>
            </div>
          </div>
        )}
      </div>
  )
}

export default MovieCard