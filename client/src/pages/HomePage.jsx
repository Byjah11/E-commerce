import styled from "styled-components";
import Slider from "../components/Slider";
import HomeBestsellers from "../components/HomeBestsellers";
import HomeCategories from "../components/HomeCategories";
import Newsletter from "../components/Newsletter";

const Container = styled.div`
  background-color: #fff;
  /* height: 200vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  border-top: 1px solid rgb(221, 221, 221);
  width: 100%;
  padding-top: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const HomePage = () => {
  return (
    <Container>
      <Slider />
      <Section>
        <Title>Bestsellers</Title>
        <HomeBestsellers count={10} flex="20" />
      </Section>
      <Section>
        <Title>Good Deals</Title>
        <HomeCategories />
      </Section>
      <Section>
        <Newsletter />
      </Section>
    </Container>
  );
};

export default HomePage;
