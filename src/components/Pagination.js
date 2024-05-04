import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AxiosMovies } from '../redux/reducers/MovieReducer';

// 페이지네이션 알고리즘
// 1. 총 몇 개의 페이지가 필요한지
// 총 게시물 수를 페이지 당 표시할 게시물의 수로 나눈 뒤 올림을 하면 몇 개의 페이지가 필요한지를 계산
// 예를 들어, 총 37개의 게시물이 있고, 페이지 당 10개의 게시물을 표시하려고 한다면
// 37 / 10 = 3.7, 여기서 올림하여 결국 4개의 페이지가 필요하게 된다.

// 2. 현재 페이지에 해당하는 게시물만 보여주기
// 페이지 당 게시물 수(limit), 현재 페이지 번호(page)를 상태로 추가한다.
const Pagination = ({ isSearch, total, limit, page, setPage }) => {
  const dispatch = useDispatch();
  const [displayedPages, setDisplayedPages] = useState([]);
  const [numPages, setNumPages] = useState(30); // 기본 상태 페이지 수 (임의의 값)

  // 버튼을 누를때 마다, page가 변경됨에 따라 api로 불러오는 데이터를 변경
  useEffect(() => {
    dispatch(AxiosMovies(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (isSearch) {
      // 검색 결과의 경우
      setNumPages(Math.ceil(total / limit)); // 검색 결과에 따라 페이지 수를 설정
    }
    // 기본 상태의 경우, numPages를 그대로 사용 (이미 설정된 값이 유지됨)
  }, [isSearch]);


  // 페이지 수가 변경될 때마다 현재 페이지를 기준으로 5개의 버튼을 보여주도록 하고, 
  // 이동 버튼들을 추가하여 5단위로 이동
  // 페이지 수가 변경될 때마다 displayedPages 배열이 갱신되어 현재 페이지를 중심으로 5개의 버튼을 보여준다
  useEffect(() => {
    const startPage = Math.floor((page - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, numPages);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    setDisplayedPages(pages);
  }, [page, numPages]);

  const handleClickFirst = () => {
    setPage(1);
  };

  const handleClickLast = () => {
    setPage(numPages);
  };

  return (
    <Nav>
       {/* disabled 를 통해 1페이지 혹은 마지막 페이지일 경우 disabled */}
      <Button onClick={handleClickFirst} disabled={page === 1}>
        {'<<'}
      </Button>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        {'<'}
      </Button>
      {displayedPages.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          aria-current={page === pageNumber ? 'page' : undefined}
        >
          {pageNumber}
        </Button>
      ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        {'>'}
      </Button>
      <Button onClick={handleClickLast} disabled={page === numPages}>
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
