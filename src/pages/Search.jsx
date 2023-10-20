import { Container } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../style/Card.css";
import { toast } from "react-toastify";
import MovieCard from "../components/moviecard/MovieCard";
import { useEffect, useState } from "react";
import Headers from "../components/headers/Headers";

function Search() {
  const location = useLocation();
  const { query } = location.state;
  const [searchedMovieList, setSearchedMovieList] = useState({});
  const [resultName, setResultName] = useState("");

  useEffect(() => {
    async function searchMovie() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/search/movie?query=${query}&page=1`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        setSearchedMovieList(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    }
    //   try {
    //     const response = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/search/movie?query=${query}&page=1`);
    //     console.log(JSON.stringify(response.data.data));
    //     setSearchedMovieList(response.data.data);
    //   } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //       toast.error(error.response.data.message);
    //       return;
    //     }
    //     toast.error(error.message);
    //   }
    // }
    setResultName(query);
    searchMovie();
  }, [query]);

  return (
    <>
      <Headers />
      <Container>
        <h2 className="text-danger p-4">Result Found: {resultName}</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {searchedMovieList.length > 0 && searchedMovieList.map((movie, i) => <MovieCard key={i} title={movie.title} poster={movie.poster_path} to={`/users/detail/${movie.id}`} />)}
        </div>
      </Container>
    </>
  );
}

export default Search;
