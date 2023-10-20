import "../../style/Card.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieCard({ title, poster, to }) {
  return (
    <Card
      variant="outline-danger"
      as={Link}
      to={to}
      style={{
        width: "18rem",
        margin: "10px",
        background: "black",
        outlineColor: "red",
        outlineStyle: "outset",
        outlineWidth: "thin",
      }}
      className="Card-component mb-5"
    >
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/original${poster}`}
      />
      <Card.Body style={{ color: "black" }}>
        <Card.Title style={{ color: "white" }}>
          <h4 className="text-center">{title}</h4>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
