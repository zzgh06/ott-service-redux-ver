import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Dropdown } from 'react-bootstrap';
import { AxiosMovieSearch } from '../redux/reducers/MovieSearchReducer';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { AxiosMovies } from '../redux/reducers/MovieReducer';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Movies = () => {
  const [limit, setLimit] = useState(100);
  const [sortBy, setSortBy] = useState(null); 
  const [selectedGenre, setSelectedGenre] = useState(null); // 선택된 장르 상태
  const dispatch = useDispatch();
  const { popularMovies, currentPage, genreList } = useSelector((state) => state.movie);
  const { searchList } = useSelector((state) => state.search);
  const [query] = useSearchParams();
  const searchQuery = query.get('query') || '';
  const [value, setValue] = useState([1970, 2024]);

  useEffect(() => {
    dispatch(AxiosMovies(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(AxiosMovieSearch(searchQuery));
  }, [dispatch, searchQuery]);  

  const moviesToDisplay = searchQuery ? searchList?.results : popularMovies?.results;

  const popularityDesc = () => {
    const sortedMovies = [...moviesToDisplay].sort((a, b) => b.popularity - a.popularity);
    setSortBy(sortedMovies);
  }

  // 인기순 정렬 : popularity 기준으로 정렬
  const popularityAsc = () => {
    const sortedMovies = [...moviesToDisplay].sort((a, b) => a.popularity - b.popularity);
    setSortBy(sortedMovies);
  }

  const resetSort = () => {
    setSortBy(null);
  }

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // 연도별 필터링
  // 1970 ~ 2024년도 기준으로 영화 정렬
  // rc-slider 활용 min 최솟값, max 최대값, step 슬라이더 움직이는 단위, defaultValue 슬라이더가 시작되는 값
  // value state에 저장된 값을 기준으로 해당 년도와 일치하는 값의 영화만 보여준다.
  const filteredMovies = moviesToDisplay.filter(movie => {
    const releaseYear = parseInt(movie.release_date.substring(0, 4));
    return releaseYear >= value[0] && releaseYear <= value[1]; 
  });


  // 장르 필터링
  // state 에 장르 아이디 저장
  const genreFilter = (genreId) => {
    if (selectedGenre === genreId) {
      // 이미 선택된 장르를 다시 클릭하면 필터 해제
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genreId);
    }
  }

  // selectedGenre state 값이 참일 경우
  // selectedGenre 장르 아이디와 일치하는 값과 일치하는 값 필터링
  // 아니면 filteredMovies 그대로
  const getFilteredMovies = () => {
    let filtered = filteredMovies;
    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.genre_ids.includes(selectedGenre));
    }
    return filtered;
  }

  return (
    <>
      <div className="movies-container">
        <div className='sort-movie'>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              정렬
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={popularityDesc}>Popularity(Desc)</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={popularityAsc}>Popularity(Asc)</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={resetSort}>되돌리기</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu style={{textAlign : 'center'}}>
                <div>YEAR Filter</div>
                <div>
                  <span style={{marginRight: '10px'}}>From : {value[0]}</span>
                  <span>to : {value[1]}</span>
                </div>
                <Slider 
                  range 
                  min={1990} 
                  max={2024}
                  step={1}
                  defaultValue={[1990, 2024]}
                  value={value}
                  onChange={handleChange}
                />
            </Dropdown.Menu>
          </Dropdown>

          <div className='genre-card'>
            <h5>Genre</h5>
            {genreList.map((item, index) => (
              <Badge
                key={index}
                style={{marginRight: '5px'}}
                bg={selectedGenre === item.id ? "primary" : "danger"}
                onClick={() => genreFilter(item.id)}
              >
                {item.name}
              </Badge>
            ))}
          </div>
        
        </div>
        <div className="movies-wrap">
          {sortBy ? sortBy.map((item, index) => (
            <MovieCard key={index} item={item} content={'movies'} />
          )) : getFilteredMovies().map((item, index) => (
            <MovieCard key={index} item={item} content={'movies'} />
          ))}
        </div>
      </div>
      <Pagination
        isSearch={moviesToDisplay === searchList.results ? moviesToDisplay.length : null}
        total={moviesToDisplay.length}
        limit={limit}
        filteredMovies={filteredMovies.length}
        setSortBy={setSortBy}
      />
    </>
  );
};

export default Movies;
