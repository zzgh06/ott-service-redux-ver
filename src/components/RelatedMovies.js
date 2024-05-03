import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// onMouseEnter, onMouseLeave 이벤트를 사용해서 hover 상태를 관리
// hoveredIndex 값과 index 값이 일치하는 경우에만 스타일을 변경
const RelatedMovies = () => {
  const { relatedMovies } = useSelector(state => state.detail);
  const { genreList } = useSelector(state => state.movie);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className='related-movies-container'>
        {relatedMovies.results.map((item, index) => (
          <div className='related-movies' key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}  
            style={{ height: hoveredIndex === index ? '40vh' : '25vh' }}>
            <img src={`https://media.themoviedb.org/t/p/w500/${item.poster_path}`} alt='' />
            <div className='overlay'>
              <div style={{ fontSize:'20px' }}>{item.title}</div>
              <div>{item.genre_ids.map((id, index) => 
                <Badge key={index} style={{ marginRight : '5px' }} bg="danger">{genreList.find(item => item.id === id).name}</Badge>
              )}
              </div>
              <div>
                <span style={{ marginRight:'5px' }}>평점 : {(item.vote_average).toFixed(2)}</span>
                <span>관람연령 : {item.adult ? "청불" : "Under 18"}</span>
              </div>
            </div>
          </div>
          )
        )}
    </div>
  )
}

export default RelatedMovies;