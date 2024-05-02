import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AxiosMovieDetail } from '../redux/reducers/MovieDetailReducer';
import { ClipLoader } from 'react-spinners';
import { Badge } from 'react-bootstrap';
import MovieReview from '../components/MovieReview';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, relatedMovies, loading, error } = useSelector(state => state.detail);

  
  useEffect(() => {
    dispatch(AxiosMovieDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader color="#ffff" loading={loading} size={300} aria-label="Loading Spinner" />
        </div>
      ) : !error && movieDetail ? (
        <div className='detail-container'>
          <div className='movie-info'>
            <div className='movie-img'>
              <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}`} alt='' />
            </div>
            <div className='movie-desc'>
              <div>
                {movieDetail.genres.map((item, index) => (
                  <Badge key={index} style={{ marginRight: '10px' }} bg="danger">{item.name}</Badge>
                ))}
              </div>
              <h1>{movieDetail.title}</h1>
              <div>{movieDetail.original_title}</div>
              <span>평점 : {movieDetail.vote_average}</span>
              <span>관람객 : {movieDetail.popularity}</span>
              <span>{movieDetail.adult ? "청소년 관람 불가" : "18세 이하 관람가"}</span>
              <hr className='hr-solid' />
              <div>{movieDetail.overview}</div>
              <hr className='hr-solid' />
              <div>
                <Badge className='badge-style' bg="danger">예산</Badge>
                ${movieDetail.budget}
              </div>
              <div>
                <Badge className='badge-style' bg="danger">개봉일</Badge>
                {movieDetail.release_date}
              </div>
              <div>
                <Badge className='badge-style' bg="danger">상영시간</Badge>
                {movieDetail.runtime}
              </div>
            </div>
          </div>
          <div>
            <MovieReview />
          </div>
        </div>
      ) : error ? (
        error
      ) : null}
    </div>
  );
};

export default MovieDetail;
