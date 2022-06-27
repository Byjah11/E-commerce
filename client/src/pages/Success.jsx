import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 200px);
  margin: auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  max-width: 600px;
`;
const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
  border-radius: 20px;
  box-shadow: var(--box-shadow);
  margin-bottom: 20px;
  width: 100%;
  min-height: 80%;
  overflow: hidden;
  position: relative;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;
const Subtitle = styled.h3`
  margin-bottom: 20px;
`;

const Button = styled(Link)`
  background-color: ${(p) => (p.invert ? "#fff" : "var(--color-primary)")};
  border: var(--color-primary) solid 2px;
  text-decoration: none;
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: 32px;
  color: ${(p) => (p.invert ? "var(--color-primary)" : "#fff")};
  border-radius: 20px;
  transition: all 150ms ease;
  font-weight: 600;
  &:hover {
    color: ${(p) => (!p.invert ? "var(--color-primary)" : "#fff")};
    background-color: ${(p) => (!p.invert ? "#fff" : "var(--color-primary)")};
  }
`;

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Card>
          <Subtitle>Thank You for shopping at byJah.com</Subtitle>
          <Title>Your payment was successful</Title>
          <Button to="/">Go to Homepage</Button>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Success;
