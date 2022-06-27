import styled from "styled-components";
import { useState } from "react";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 1156px;
  min-height: calc(100vh - 200px);
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const CatTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 400;
  text-transform: capitalize;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
const FiltersWrapper = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgb(221, 221, 221);
`;

const ProductsWrapper = styled.div`
  flex: 9;
  display: flex;
  padding: 0 16px;
  flex-direction: column;
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
  border-bottom: 1px solid rgb(221, 221, 221);
  border-top: 1px solid rgb(221, 221, 221);
  margin-bottom: 16px;
`;

const SortSelect = styled.select`
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid #777;
  cursor: pointer;
`;

const SortLabel = styled.div`
  position: absolute;
  line-height: 16px;
  top: -8px;
  left: 16px;
  background-color: white;
  padding: 0 4px;
  color: #777;
`;

const SortOption = styled.option``;

const BrowseProducts = () => {
  const [results, setResults] = useState(0);
  const location = useLocation();
  const entries = location.search
    .slice(1)
    .split("&")
    .map((q) => q.split("="));
  const query = Object.fromEntries(entries);
  const [sort, setSort] = useState("newest");

  return (
    <Container>
      <CatTitle>
        {query.category ? query.category : "All Products"}

        <span
          style={{ color: "#777", fontSize: "1.2rem" }}
        >{` (${results} results)`}</span>
      </CatTitle>
      <Wrapper>
        {/* <FiltersWrapper>
          <Title>Filters</Title>
        </FiltersWrapper> */}
        <ProductsWrapper>
          <Sort>
            <div style={{ position: "relative" }}>
              <SortLabel>Sort</SortLabel>
              <SortSelect
                onChange={(e) => setSort(e.target.value)}
                defaultValue="newest"
              >
                <SortOption value="newest">Newest</SortOption>
                <SortOption value="asc">Price (asc)</SortOption>
                <SortOption value="desc">Price (desc)</SortOption>
              </SortSelect>
            </div>
          </Sort>
          <Products
            setResults={setResults}
            sort={sort}
            query={query}
            flex="25"
          />
        </ProductsWrapper>
      </Wrapper>
    </Container>
  );
};

export default BrowseProducts;
