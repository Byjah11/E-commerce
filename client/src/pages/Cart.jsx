import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../components/CartProduct";
import { clearCart } from "../redux/cartSlice";
import { DeleteOutlined, DoubleArrow } from "@mui/icons-material";
import { createCheckoutSession } from "../api/api";

const Container = styled.div`
  width: 100%;
  max-width: 1156px;
  min-height: calc(100vh - 200px);
  margin: auto;
  display: flex;
`;
const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const LeftTop = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 26px;
`;

const Button = styled.button`
  height: 40px;
  border-radius: 50px;
  padding: 8px 16px;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background-color: #eee;
    color: #111;
  }
`;

const CartItems = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Right = styled.div`
  flex: 1;
  padding: 56px 16px 0 16px;
`;

const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgb(221, 221, 221);
  background-color: whitesmoke;
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 16px 0;
`;
const TotalText = styled.div``;
const TotalPrice = styled.div``;

const CheckoutButton = styled.button`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 50px;
  border: none;
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 150ms ease;
  &:hover {
    background-color: rgb(67, 89, 198);
  }

  div {
    position: absolute;
    left: 16px;
    transition: all 0.5s ease;
    display: flex;
    align-items: center;
  }

  &:hover div {
    transform: translateX(274px);
  }
`;

const Cart = () => {
  const cart = useSelector((s) => s.cart);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    // const items = cart.products.map((p) => ({ id: p._id, amount: p.amount }));
    console.log(cart.products);
    createCheckoutSession(cart.products);
  };

  return (
    <Container>
      <Left>
        <LeftTop>
          <Title>
            Cart
            <span style={{ color: "#777" }}>
              {` (${cart.products.reduce((sum, p) => sum + p.amount, 0)})`}
            </span>
          </Title>
          <Button onClick={() => dispatch(clearCart())}>
            <DeleteOutlined />
            Clear
          </Button>
        </LeftTop>
        {cart.products.length <= 0 ? (
          <Title style={{ textAlign: "center" }}>Your Cart is Empty</Title>
        ) : (
          <CartItems>
            {cart.products.map((p) => (
              <CartProduct key={p._id} p={p} />
            ))}
          </CartItems>
        )}
      </Left>
      <Right>
        <Checkout>
          <Title>Order Summary</Title>
          <Total>
            <TotalText>Total</TotalText>
            <TotalPrice>
              {String(cart.total).slice(0, -2)},{String(cart.total).slice(-2)}zł
            </TotalPrice>
          </Total>
          <CheckoutButton onClick={handleCheckout}>
            Checkout{" "}
            <div>
              <DoubleArrow />
            </div>
          </CheckoutButton>
        </Checkout>
      </Right>
    </Container>
  );
};

export default Cart;
