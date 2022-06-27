import styled from "styled-components";
import { goodDeals } from "../data";

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
`;
const Info = styled.div`
  position: absolute;
  opacity: 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: all 0.5s ease;

  button {
    background-color: transparent;
    border: 2px #fff solid;
    border-radius: 10px;
    font-size: 2rem;
    margin-top: 10px;
    color: #fff;
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.5s ease;
`;

const Category = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  &:hover ${Info} {
    opacity: 1;
  }
  &:hover ${Image} {
    transform: scale(1.1);
  }
`;

const CategoryWrapper = styled.div`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const HomeCategories = () => {
  return (
    <Container>
      {goodDeals.map((c) => (
        <CategoryWrapper key={c.id}>
          <Category>
            <Image src={c.img} />
            <Info>
              <div>{c.title}</div>
              <button>Shop Now</button>
            </Info>
          </Category>
        </CategoryWrapper>
      ))}
    </Container>
  );
};

export default HomeCategories;
