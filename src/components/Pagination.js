import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import styled from 'styled-components';
import { AxiosMovies, movieActions } from '../redux/reducers/MovieReducer'; 

const Pagination = ({ isSearch, total, limit }) => {
  const dispatch = useDispatch();
  const {currentPage, popularMovies} = useSelector(state => state.movie); 

  const [displayedPages, setDisplayedPages] = useState([]);
  const numPages = Math.ceil(popularMovies.total_pages / limit);


  useEffect(() => {
    dispatch(AxiosMovies(currentPage)); // 현재 페이지로 초기 데이터 로드
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (isSearch) {
      numPages = Math.ceil(total / limit);
    }
  }, [isSearch]);

  // 페이지 수가 변경될 때마다 현재 페이지를 기준으로 5개의 버튼을 보여주도록 하고, 
  // 이동 버튼들을 추가하여 5단위로 이동
  // 페이지 수가 변경될 때마다 displayedPages 배열이 갱신되어 현재 페이지를 중심으로 5개의 버튼을 보여준다
  useEffect(() => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, numPages);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    setDisplayedPages(pages);
  }, [currentPage, numPages]);

  const handleClickFirst = () => {
    dispatch(movieActions.setCurrentPage(1)); 
  };

  const handleClickLast = () => {
    dispatch(movieActions.setCurrentPage(numPages)); 
  };

  const handleClickPage = (pageNumber) => {
    dispatch(movieActions.setCurrentPage(pageNumber)); 
  };

  return (
    <Nav>
      {/* disabled 를 통해 1페이지 혹은 마지막 페이지일 경우 disabled */}
      <Button onClick={handleClickFirst} disabled={currentPage === 1}>
        {'<<'}
      </Button>
      <Button onClick={() => handleClickPage(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </Button>
      {displayedPages.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => handleClickPage(pageNumber)}
          aria-current={currentPage === pageNumber ? 'page' : undefined}
        >
          {pageNumber}
        </Button>
      ))}
      <Button onClick={() => handleClickPage(currentPage + 1)} disabled={currentPage === numPages}>
        {'>'}
      </Button>
      <Button onClick={handleClickLast} disabled={currentPage === numPages}>
        {'>>'}
      </Button>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
