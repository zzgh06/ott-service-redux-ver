// Movies 컴포넌트
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { AxiosMovieSearch } from '../redux/reducers/MovieSearchReducer';
import { useSearchParams } from 'react-router-dom';
import { AxiosMovies } from '../redux/reducers/MovieReducer';
import { Dropdown } from 'react-bootstrap';

const Movies = () => {
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { popularMovies } = useSelector((state) => state.movie);
  const { searchList } = useSelector((state) => state.search);
  const [query] = useSearchParams();
  const searchQuery = query.get('query') || '';

  useEffect(() => {
    dispatch(AxiosMovies());
  }, []);


  useEffect(() => {
    dispatch(AxiosMovieSearch(searchQuery));
  }, [dispatch, searchQuery]);

  const moviesToDisplay = searchQuery ? searchList.results : popularMovies.results;

  return (
    <>
      <div className="movies-container">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

        <div className="movies-wrap">
          {moviesToDisplay.map((item, index) => (
            <MovieCard key={index} item={item} content={'movies'} />
          ))}
        </div>
      </div>
      <Pagination isSearch={moviesToDisplay === searchList.results ? moviesToDisplay.length : null} total={moviesToDisplay.length} limit={limit} page={page} setPage={setPage} />
    </>
  );
};

export default Movies;
