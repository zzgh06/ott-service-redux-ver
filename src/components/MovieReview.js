import React from 'react'
import { useSelector } from 'react-redux';

const MovieReview = () => {
  const { movieReviews } = useSelector(state => state.detail);
  // console.log('MovieReview', movieReviews.results)
  return (
    <div>
      <div className='movie-review'>
        {movieReviews.results.map((item, index) => (
          <div key={index}>
            <h5>작성자 : {item.author_details.username}</h5>
            <div>리뷰내용 : <br/>{item.content}</div>
            <hr className='hr-solid'/>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default MovieReview