import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { AddShoppingCart, Remove, Add } from "@mui/icons-material";
import { fetchProduct } from "../api/api";

const Container = styled.div`
  width: 100%;
  max-width: 1156px;
  min-height: calc(100vh - 200px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #ccc; */
`;

const Main = styled.div`
  width: 100%;
  display: flex;
`;
const ImageContainer = styled.div`
  flex: 8;
  padding: 0 16px;
`;
const Image = styled.img`
  width: 100%;
`;

const MainInfo = styled.div`
  flex: 9;
  padding: 0 16px;
`;
const MainTitle = styled.div`
  font-size: 1.8rem;
  margin-bottom: 16px;
`;
const MainInfoBottom = styled.div`
  display: flex;
`;
const MainSpecs = styled.div`
  flex: 1;
  margin-right: 32px;
  padding-top: 16px;
  border-top: 1px solid rgb(221, 221, 221);
`;

const SpecsList = styled.ul`
  list-style: none;
  padding: 0;
`;
const Spec = styled.li`
  margin-bottom: 8px;
`;

const SpecKey = styled.span`
  margin-right: 8px;
  color: rgb(112, 112, 112);
  &::after {
    content: ":";
  }
`;
const SpecValue = styled.span``;

const MainCart = styled.div`
  flex: 1;
  padding: 16px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;
const MainPrice = styled.div`
  font-size: 1.8rem;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const MainCartButtons = styled.div`
  display: flex;
  align-items: center;
`;

const AmountInput = styled.div`
  margin-right: 8px;
  width: 0;
  flex: 2;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  border: 1px solid rgb(221, 221, 221);
  font-size: 1.2rem;
  font-weight: 600;
  height: 40px;
`;

const AmountButton = styled.button`
  border-radius: ${(p) => (p.left ? "50px 0 0 50px" : "0 50px 50px 0")};
  border: 1px solid transparent;
  height: 40px;
  width: 30px;
  /* margin-right: 8px; */
  background-color: rgb(221, 221, 221);
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: ${(p) => (p.disabled ? "normal" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${(p) => (p.disabled ? "#eee" : "var(--color-primary)")};
  transition: all 150ms ease;

  &:hover {
    background-color: ${(p) =>
      p.disabled ? "transparent" : "var(--color-primary)"};
    color: ${(p) => (p.disabled ? "#eee" : "#fff")};
  }
`;

const AddToCart = styled.button`
  flex: 3;
  display: flex;
  align-items: center;
  background-color: #4aa821;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  &:hover {
    background-color: #2e6a14;
  }
`;

const ProductPage = () => {
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await fetchProduct(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleAdd = () => {
    dispatch(addProduct({ ...product, amount }));
  };

  return (
    <Container>
      <Main>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <MainInfo>
          <MainTitle>{product.name}</MainTitle>
          <MainInfoBottom>
            <MainSpecs>
              {product.specs && (
                <SpecsList>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <Spec key={key}>
                      <SpecKey>{key}</SpecKey>
                      <SpecValue>{value}</SpecValue>
                    </Spec>
                  ))}
                </SpecsList>
              )}
            </MainSpecs>
            <MainCart>
              <MainPrice>
                {String(product.price).slice(0, -2)},
                {String(product.price).slice(-2)} zł
              </MainPrice>
              <MainCartButtons>
                <AmountInput>
                  <AmountButton
                    left
                    disabled={amount <= 1}
                    onClick={() => {
                      if (amount > 1) {
                        setAmount(amount - 1);
                      }
                    }}
                  >
                    <Remove />
                  </AmountButton>
                  {amount}
                  <AmountButton
                    disabled={amount >= product.inStock}
                    onClick={() => setAmount(amount + 1)}
                  >
                    <Add />
                  </AmountButton>
                </AmountInput>
                <AddToCart onClick={handleAdd}>
                  <AddShoppingCart /> Add To Cart
                </AddToCart>
              </MainCartButtons>
            </MainCart>
          </MainInfoBottom>
        </MainInfo>
      </Main>
    </Container>
  );
};

export default ProductPage;
