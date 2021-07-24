import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import "./ab.css"
const ProductScreen = ({ product }) => {

  return (
    <>
    <div  className="qw1">
      <Card   style={{ borderRadius:"70px" }}  className="my-3 p-3 rounded  qw1">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="div">RS. {product.price}</Card.Text>
        </Card.Body>
      </Card>
      </div>
    </>
  );
};

export default ProductScreen;
