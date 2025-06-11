/*
1/ 
Sometimes we use braces {} between HTML tags or plaintext to tell React that "hey this is Javascript, calculate it!"

2/ why we use "onClick={() => handleClick("left")}" but not "onClick={handleClick("left")}"
because onClick={handleClick("left")} -> React will call the handleClick() immediately after it renders. () => handleClick("left"), in the other hand, creating an anonymous function when users click and then call handleClick().

*/

import styled from "styled-components"
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { sliderItems } from "../data";
import { useState } from "react";
import { mobile } from "../responsive";
import { ContentPasteOffOutlined } from "@mui/icons-material";

const Container = styled.div `
    width: 100%;
    height: 100vh;
    display: flex;
    /* background-color: coral; */
    position: relative;
    overflow: hidden;
    ${mobile`
      display: none;
    `}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #e4d1d1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: ${props=> props.$direction === 'right' && '10px'}; //corresponding to component named "direction = 'right'" below
    left: ${props=> props.$direction === 'left' && '10px'}; ////corresponding to component named "direction = 'left'" below
    cursor: pointer;
    z-index: 2;
    opacity: 50%;
`

//we can pass-in a variable {..} for a component too, check <Wrapper/> below
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: ${({ $slideindex }) => `translateX(${ $slideindex * -100}vw)`};
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${props => props.$bg};
`

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  
`

const Image = styled.img`
  height: 80%;
  /* width: 100%; */
`

const InfoContainer = styled.div`
  flex: 2;
  padding: 50px;
  background-color: pink;
`

const Title = styled.h1`
  font: 70px;
  font-size: 60px;
  font-weight: bold;
  color: #862805;
`

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
`

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
`

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0); //keep state updated for slider

  const handleClick = (current_direction) => {
    if(current_direction === "left") {
      setSlideIndex(slideIndex > 0 ? (slideIndex-1) : 2);
      // console.log(slideIndex);
      // console.log("clicking left");
    } else {
      setSlideIndex(slideIndex < 2 ? (slideIndex+1) : 0);
      // console.log(slideIndex);
      // console.log("clicking right");
    }
  };

  // we can fix the warning with this <Wrapper style={{ transform: `translateX(${slideIndex * -100}vw)` }}> OR change the first slideIndex to slideindex
  return (
    <Container>
        <Arrow $direction = 'left' onClick={() => handleClick("left")}> <ArrowBackIosOutlinedIcon/> </Arrow>
        <Wrapper $slideindex={slideIndex}>
          {sliderItems.map( item=>(
            <Slide $bg = {item.bg} key = {item.id}>
              <ImgContainer>
                <Image src = {item.img}/>
              </ImgContainer>
              <InfoContainer>
                <Title> {item.title} </Title>
                <Description> {item.desc} </Description>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow $direction = 'right' onClick={() => handleClick("right")}> <ArrowForwardIosOutlinedIcon/> </Arrow>
    </Container>
  )
}

export default Slider