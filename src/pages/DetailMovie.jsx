import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import "../style/Detail.css";
import NavigationBar from "../components/navigation/NavigationBar";
import { useEffect, useState } from "react";

function DetailMovie() {
  const [detailMovie, setDetailMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://shy-cloud-3319.fly.dev/api/v1/movie/569094`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(JSON.stringify(response.data.data));
        const data = response.data.data;
        setDetailMovie(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            // Temporary solution
            return (window.location.href = "/");
          }

          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getDetailMovie();
  }, [params]);

  return (
    <>
      <NavigationBar />
      <Carousel controls={false}>
        <Carousel.Item>
          <img
            className="Carousel-img d-block w-100"
            src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`}
            alt="First slide"
          />
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie?.title}</h2>
            <p className="Movie-genres">
              {detailMovie?.genres &&
                detailMovie?.genres?.length > 0 &&
                detailMovie?.genres?.map((genre, i) => {
                  return i === detailMovie?.genres.length - 1
                    ? genre.name
                    : `${genre.name}, `;
                })}
            </p>
            <p className="Movie-caption-text">{detailMovie?.overview}</p>
            <p className="Movie-rate">
              <StarFill className="Icon-star" />
              {detailMovie?.vote_average
                ? detailMovie.vote_average.toFixed(1)
                : "-"}
            </p>
            <Button className="Movie-caption-button" variant="danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default DetailMovie;
