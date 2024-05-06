import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { AxiosMovieSearch } from '../redux/reducers/MovieSearchReducer';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { AxiosMovies } from '../redux/reducers/MovieReducer';

const Movies = () => {
  const [limit, setLimit] = useState(100);
  const [sortBy, setSortBy] = useState(null); 
  const dispatch = useDispatch();
  const { popularMovies, currentPage } = useSelector((state) => state.movie);
  const { searchList } = useSelector((state) => state.search);
  const [query] = useSearchParams();
  const searchQuery = query.get('query') || '';
  console.log(searchQuery)

  useEffect(() => {
    dispatch(AxiosMovies(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(AxiosMovieSearch(searchQuery));
  }, [dispatch, searchQuery]);  

  // const moviesToDisplay = searchQuery ? searchList.results : popularMovies.results;
  const moviesToDisplay = searchQuery ? searchList?.results : popularMovies?.results;

  // 내림차순 정렬
  const popularityDesc = () => {
    const sortedMovies = [...moviesToDisplay].sort((a, b) => b.popularity - a.popularity);
    setSortBy(sortedMovies);
  }

  // 오름차순 정렬
  const popularityAsc = () => {
    const sortedMovies = [...moviesToDisplay].sort((a, b) => a.popularity - b.popularity);
    setSortBy(sortedMovies);
  }

  // 정렬 취소
  const resetSort = () => {
    setSortBy(null);
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
        </div>
        <div className="movies-wrap">
          {sortBy ? sortBy.map((item, index) => (
            <MovieCard key={index} item={item} content={'movies'} />
          )) : moviesToDisplay.map((item, index) => (
            <MovieCard key={index} item={item} content={'movies'} />
          ))}
        </div>
      </div>
      <Pagination
        isSearch={moviesToDisplay === searchList.results ? moviesToDisplay.length : null}
        total={moviesToDisplay.length}
        limit={limit}
        popularityAsc={popularityAsc}
        setSortBy={setSortBy}
      />
    </>
  );
};

export default Movies;
