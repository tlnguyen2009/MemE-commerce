// Single product page

import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../Components/Announcement"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import Newsletter from "../Components/Newsletter"
import { mobile } from "../responsive"

const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile`
        padding: 10px;
        flex-direction: column;
    `};
`

const ImageContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile`
        height: 45vh;
    `};
`

const InfoContainer = styled.div` 
    flex: 1; /*flex: 1 to match with flex: 1 above, which means devide the screen into 2 equal parts*/
    padding: 0px 50px;
    ${mobile`
        padding: 0px 10px;
    `}
`

const Title = styled.h1`
    font-weight: 400; /*make it look thinner than h1*/
`

const Desc = styled.p`
    margin: 20px 0px;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;

    ${mobile`
        font-size: 25px;
        font-weight: 200;
    `}
`

const AddContainer = styled.div`
    margin: 20px 0px;
    ${mobile`
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    `}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 770;
    margin: 10px 0px;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
`

const AdjustButton = styled.div`
    &:hover {
        cursor: pointer;      
    }

    transition: transform 0.1s ease;
    &:active {
        transform: scale(0.90);
    }
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid gray;
    background-color: white;
    cursor: pointer;
    font-weight: 700;

    &:hover {
        background-color: #d0cfcf;
    }

    ${mobile`
        padding: 7px;
    `}
`

const Product = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImageContainer>
                <Image src = "/Assets/product_crying5.jpg"/>
            </ImageContainer>
            
            <InfoContainer>
                <Title>When Life Meows, but It Hurts</Title>
                <Desc>
                    This is no ordinary feline. Behold the Crying Cat, a creature whose soul has witnessed the darkest depths of human emotion — or 
                    at least the moment you realize your code has been broken for three hours because of a single misplaced bracket. With glassy, 
                    tear-filled eyes and a trembling mouth that speaks silent volumes, this cat captures the fragile emotional state of everyone 
                    who's ever pretended to be okay but was actually on the brink of a full-on existential breakdown.
                    It’s the face you make when:
                            <ul>
                                <li>You say “I’m fine” but you’re not fine.</li>
                                <li>You drop your taco right after saying how happy you are.</li>
                                <li>You accidentally hit "Reply All."</li>
                                <li>Or when you realize the “save” button you didn’t press 4 hours ago was your last lifeline.</li>
                            </ul>
                </Desc>
                
                <AddContainer>
                    <Price>$ 1.00 ea.</Price>
                    <AmountContainer>
                        <AdjustButton><Remove/></AdjustButton>
                        <Amount>1</Amount>
                        <AdjustButton><Add/></AdjustButton>
                    </AmountContainer>
                    <Button>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product