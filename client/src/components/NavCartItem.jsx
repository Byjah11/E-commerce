import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-top: 8px;
  border-bottom: 1px solid rgb(221, 221, 221);
  min-height: 80px;
`;
const Image = styled.img`
  width: 80px;
  margin-right: 16px;
`;
const Info = styled.div`
  display: flex;
  min-height: 80px;
  padding: 8px 0;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
const Name = styled.div``;
const Price = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavCartItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Name>{item.name}</Name>
        <Price>
          <div>x{item.amount} </div>
          {String(item.price).slice(0, -2)},{String(item.price).slice(-2)} zł
        </Price>
      </Info>
    </Container>
  );
};

export default NavCartItem;
