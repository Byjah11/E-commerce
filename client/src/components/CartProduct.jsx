import styled from "styled-components";
import {
  Remove,
  Add,
  FavoriteBorder,
  DeleteOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../redux/cartSlice";

const Container = styled.li`
  display: flex;
  height: 120px;
  align-items: center;
  padding: 12px;
  border-left: 1px solid rgb(221, 221, 221);
  border-right: 1px solid rgb(221, 221, 221);
  border-top: 1px solid rgb(221, 221, 221);

  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
    border-bottom: 1px solid rgb(221, 221, 221);
  }
  &:only-child {
    border-radius: 8px;
    border: 1px solid rgb(221, 221, 221);
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  margin-right: 20px;
`;

const Image = styled.img`
  height: 100%;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  overflow-wrap: break-word;
`;

const Price = styled.div`
  margin-left: 20px;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountInput = styled.div`
  margin: 0 8px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  border: 1px solid rgb(221, 221, 221);
  height: 30px;
`;

const AmountButton = styled.button`
  border-radius: ${(p) => (p.left ? "50px 0 0 50px" : "0 50px 50px 0")};
  border: 1px solid transparent;
  height: 30px;
  width: 30px;
  margin: ${(p) => (p.left ? "0 4px 0 0" : "0 0 0 4px")};
  background-color: transparent;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: ${(p) => (p.disabled ? "normal" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => (p.disabled ? "#eee" : "var(--color-primary)")};
  transition: all 150ms ease;
  &:hover {
    background-color: ${(p) =>
      p.disabled ? "transparent" : "var(--color-primary)"};
    color: ${(p) => (p.disabled ? "#eee" : "#fff")};
  }
`;

const Button = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
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

const CartProduct = ({ p }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <ImageContainer>
        <Image src={p.img} />
      </ImageContainer>
      <Info>
        <Name>{p.name}</Name>
        <Price>
          {String(p.price * p.amount).slice(0, -2)},
          {String(p.price * p.amount).slice(-2)}zł
        </Price>
      </Info>
      <Options>
        <AmountInput>
          <AmountButton
            left
            disabled={p.amount <= 1}
            onClick={() => {
              if (p.amount > 1) {
                dispatch(removeProduct({ id: p._id, amount: 1 }));
              }
            }}
          >
            <Remove />
          </AmountButton>
          {p.amount}
          <AmountButton
            disabled={p.amount >= p.inStock}
            onClick={() => dispatch(addProduct({ ...p, amount: 1 }))}
          >
            <Add />
          </AmountButton>
        </AmountInput>
        <Button>
          <FavoriteBorder />
        </Button>
        <Button
          onClick={() =>
            dispatch(removeProduct({ id: p._id, amount: p.amount }))
          }
        >
          <DeleteOutlined />
        </Button>
      </Options>
    </Container>
  );
};

export default CartProduct;
