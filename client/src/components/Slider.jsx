import styled from "styled-components";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { sliderItems } from "../data";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 50px;
`;

const SliderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  border-radius: 50px;
  transform: ${(props) => `translateX(${props.slideIndex * -100}%)`};

  transition: all 250ms ease;
  box-shadow: var(--box-shadow);
  height: 300px;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  border-radius: 50px;
`;

const ImgContainer = styled.div``;

const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 50px;
  object-fit: cover;
`;

const TitlesWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 50px;
  justify-content: space-between;
`;

const SlideTitle = styled.div`
  display: flex;
  justify-content: center;
  span {
    padding: 5px 0;
    border-width: 4px;
    font-size: 0.9rem;
    border-style: solid;
    border-color: ${(props) =>
      props.id === props.slideIndex
        ? "var(--color-primary) transparent transparent transparent"
        : "transparent"};
    font-weight: 300;
    cursor: pointer;
  }
`;

const Arrow = styled.button`
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--lightgrey);
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  position: absolute;
  left: ${(props) => props.direction === "left" && 0};
  right: ${(props) => props.direction === "right" && 0};
  box-shadow: var(--box-shadow);
  transform: translate(
    ${(props) => (props.direction === "left" ? "-50%" : "50%")},
    -30%
  );

  &:hover {
    background-color: #ccc;
  }
  &:active {
    background-color: #aaa;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const changeSlide = (dir) => {
    if (dir === "left")
      setSlideIndex(slideIndex === 0 ? sliderItems.length - 1 : slideIndex - 1);
    if (dir === "right")
      setSlideIndex(slideIndex === sliderItems.length - 1 ? 0 : slideIndex + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      changeSlide("right");
    }, 5000);

    return () => clearTimeout(timer);
  }, [slideIndex]);

  return (
    <Container>
      <Arrow direction="left" onClick={() => changeSlide("left")}>
        <ArrowBackIosNew />
      </Arrow>
      <Wrapper>
        <SliderWrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide key={item.id}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
            </Slide>
          ))}
        </SliderWrapper>
      </Wrapper>
      <TitlesWrapper>
        {sliderItems.map((item) => (
          <SlideTitle key={item.id} id={item.id} slideIndex={slideIndex}>
            <span onClick={() => setSlideIndex(item.id)}>{item.title}</span>
          </SlideTitle>
        ))}
      </TitlesWrapper>
      <Arrow direction="right" onClick={() => changeSlide("right")}>
        <ArrowForwardIos />
      </Arrow>
    </Container>
  );
};

export default Slider;
