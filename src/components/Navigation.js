import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [keyword, setKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const search = () => {
    setSearchParams({ query: keyword });
    navigate(`/movies/?query=${keyword}`)
  };

  // 이슈 : 엔터키 이벤트 검색 시 query 이 제대로 전달되지 않음
  // 엔터키 이벤트가 발생시, 폼 제출 동작이 발생하는데 이로 인해 원하지 않은 동작을 발생시켜 발생한 오류
  // e.preventDefault(); // 기본 동작 방지
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      e.preventDefault();
      search(); 
    }
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              width={100}
              src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress} 
              />
              <Button variant="outline-danger" onClick={search}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
