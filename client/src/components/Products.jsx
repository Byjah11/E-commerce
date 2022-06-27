import styled from "styled-components";
import { productsData } from "../data";
import { fetchProducts } from "../api/api";
import { useState, useEffect } from "react";

import Product from "./Product";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  /* justify-content: space-between; */
`;

const Products = ({ query, flex, setResults, sort }) => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let res;
        if (query) {
          res = await fetchProducts(query);
        } else {
          res = await fetchProducts({});
        }
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [query]);

  useEffect(() => {
    setResults(products.length);
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    if (sort === "newest") {
      setSortedProducts((prev) =>
        prev.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } else if (sort === "asc") {
      setSortedProducts((prev) => prev.sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setSortedProducts((prev) => prev.sort((a, b) => b.price - a.price));
    }
  }, [products, sort]);

  return (
    <Container>
      {sortedProducts.map((p) => (
        <Product key={p._id} p={p} flex={flex} />
      ))}
    </Container>
  );
};

export default Products;
