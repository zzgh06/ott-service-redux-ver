import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AxiosMovieDetail, detailAction } from '../redux/reducers/MovieDetailReducer';
import { ClipLoader } from 'react-spinners';
import { Badge } from 'react-bootstrap';
import MovieReview from '../components/MovieReview';
import RelatedMovies from '../components/RelatedMovies';
import YouTube from 'react-youtube';


// 새로운 Redux state 값을 추가하여 detailSlice reducers 를 통해 state 값을 직접 수정
// 각 버튼 클릭 시 해당 state 값을 업데이트 할 수 있도록 action를 통해 값을 보내서 state 수정
// 컴포넌트에서 해당 state 값을 읽어와서 조건부로 렌더링합니다.
const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, movieReviews, trailer, loading, error } = useSelector(state => state.detail);
  const showReviews = useSelector(state => state.detail.showReviews);
  const showRelatedMovies = useSelector(state => state.detail.showRelatedMovies);
  const opts = {height: '300', width: '480'};

  useEffect(() => {
    dispatch(AxiosMovieDetail(id));
  }, [dispatch, id]);

  // REVIEWS 버튼 클릭 시 처리하는 함수
  const handleShowReviews = () => {
    dispatch(detailAction.setShowReviews(true));
    dispatch(detailAction.setShowRelatedMovies(false));
  };

  // RELATED MOVIES 버튼 클릭 시 처리하는 함수
  const handleShowRelatedMovies = () => {
    dispatch(detailAction.setShowRelatedMovies(true));
    dispatch(detailAction.setShowReviews(false)); 
  }

  // console.log(trailer.results[0].key)
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
              <YouTube videoId={trailer.results[0]?.key} opts={opts} />
            </div>
          </div>
          <div>
            <div className='movie-buttons'>
              <button style={{marginRight:'15px'}} onClick={handleShowReviews}>REVIEWS ({movieReviews.results.length})</button>
              <button onClick={handleShowRelatedMovies}>RELATED MOVIES</button>
            </div>
            {/* 조건부 렌더링 */}
            {showReviews && <MovieReview />}
            {showRelatedMovies && <RelatedMovies />}
          </div>
        </div>
      ) : error ? (
        error
      ) : null}
    </div>
  );
};

export default MovieDetail;
