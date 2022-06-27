import styled from "styled-components";
import { FavoriteBorder, AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";

const ProductWrapper = styled.div`
  flex: 0 0 ${(p) => p.flex}%;
  margin-bottom: 22px;
  display: flex;
  align-items: stretch;
  overflow-wrap: anywhere;
`;

const IconWrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 250ms ease;
`;

const CartIconWrapper = styled(IconWrapper)`
  bottom: 16px;
  right: 16px;
  color: #4aa821;
  border: 2px solid #4aa821;
  &:hover {
    background-color: #4aa821;
    color: white;
  }
`;

const FavIconWrapper = styled(IconWrapper)`
  top: 16px;
  right: 16px;
  color: #666;
  &:hover {
    background-color: rgb(221, 221, 221);
    color: black;
  }
`;

const ProductCard = styled.div`
  position: relative;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 250ms ease;
  background-color: transparent;

  &:hover {
    box-shadow: var(--box-shadow);
  }
  &:hover ${IconWrapper} {
    opacity: 1;
  }
`;

const LinkWrapper = styled(Link)`
  color: inherit;
  text-decoration: none;
  padding: 16px;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Image = styled.img`
  width: 80%;
`;
const Info = styled.div`
  padding: 5px;
`;
const Title = styled.div`
  margin-bottom: 10px;
`;
const PrevPrice = styled.div`
  font-size: 0.8rem;
  min-height: 0.8rem;
  color: #666;
  text-decoration: line-through;
`;
const Price = styled.div``;

const Product = ({ p, flex }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...p, amount: 1 }));
  };

  return (
    <ProductWrapper flex={flex}>
      <ProductCard>
        <LinkWrapper to={`/product/${p._id}`}>
          <ImgContainer>
            <Image src={p.img} />
          </ImgContainer>
          <Info>
            <Title>{p.name}</Title>
            <PrevPrice>
              {p.prevPrice > 0 &&
                `${String(p.prevPrice).slice(0, -2)},${String(
                  p.prevPrice
                ).slice(-2)} zł`}
            </PrevPrice>
            <Price>
              {String(p.price).slice(0, -2)},{String(p.price).slice(-2)} zł
            </Price>
          </Info>
        </LinkWrapper>
        <CartIconWrapper>
          <AddShoppingCart onClick={(e) => handleAddToCart(e)} />
        </CartIconWrapper>
        <FavIconWrapper>
          <FavoriteBorder />
        </FavIconWrapper>
      </ProductCard>
    </ProductWrapper>
  );
};

export default Product;
