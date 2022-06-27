import styled from "styled-components";
import { productsData } from "../data";
import { fetchProducts } from "../api/api";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Product from "./Product";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  /* justify-content: space-between; */
`;

const Products = ({ flex, count }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchProducts({});
        setProducts(res.data.splice(0, count));
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
      {products.map((p) => (
        <Product key={p._id} p={p} flex={flex} />
      ))}
    </Container>
  );
};

export default Products;
