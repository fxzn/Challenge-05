// import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import Headers from "../components/headers/Headers";
import MovieCard from "../components/moviecard/MovieCard";
import { useEffect, useState } from "react";

function Home() {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function getMovieList() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false); // User is not logged in
          return;
        }
        setIsLoggedIn(true); // User is logged in

        const response = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/movie/popular`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPopularMovieList(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    }
    getMovieList();
  }, []);


  return (
    <>
      <Headers />
      <Container>
        <Row className="mx-4 py-3">
          <Col xs={12} md={8}>
            <div className="">
              <h1 style={{ color: "red" }}>Populer Movie</h1>
            </div>
          </Col>

          <Col className="d-flex justify-content-end px-3" xs={6} md={4}>
            <div className="d-flex align-items-center ">
              <button type="button" style={{ border: "none", background: "black", color: "red" }}>
                Load More <AiOutlineArrowRight />
              </button>
            </div>
          </Col>
        </Row>

        {isLoggedIn ? ( // Render the movie cards only if the user is logged in
          <div className="d-flex flex-wrap justify-content-center">
            {popularMovieList.map((movie, i) => (
              <MovieCard key={i} poster={movie.poster_path} to={`/users/detail/${movie.id}`} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-3">
          <p style={{ fontSize: "58px" }}>Please login to view popular movies.</p>
        </div>
        )}
      </Container>
    </>
  );
}

export default Home;
