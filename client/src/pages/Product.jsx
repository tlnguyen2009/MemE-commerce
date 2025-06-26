/*
(1) we need "?" there because If product.price is undefined (which it often is before 
    your API fetch finishes), it will crash. Now, with ?.toFixed(2) => safe, no crash, 
    it waits until data is fetched.
*/

// Single product page

import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../Components/Announcement"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import Newsletter from "../Components/Newsletter"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/cartRedux"

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

const Desc = styled.div`
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
  //Extracting the path from "Product.jsx" in Component folder.
  const location = useLocation();
  const id = location.pathname.split('/')[2]; 
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
            setProduct(res.data);
            console.log("Fetched product:", res.data);
        } catch (err) {
            console.error("Error fetching product:", err);
        }
    };
    // console.log(id);
    getProduct();
    console.log(product);
  }, [id])

  //Update quantity
  const handleQuantity = (signal) => {
    if (signal === 'decrease' && quantity > 1) {
        setQuantity(quantity - 1)
    } else if (signal === 'increase') {
        setQuantity(quantity + 1)
    }
  }

  //Update cart by using Redux dispath
  const handleAddCart = () => {
    dispatch(addProduct({product, quantity, total: product.price*quantity}))
  }

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImageContainer>
                <Image src = {product.img}/>
            </ImageContainer>
            
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                
                <AddContainer>
                    <Price>${product.price?.toFixed(2)}</Price> {/* why we need "?". Read (1)  */}
                    <AmountContainer>
                        <AdjustButton onClick = {() => handleQuantity("decrease")}><Remove/></AdjustButton>
                        <Amount>{quantity}</Amount>
                        <AdjustButton onClick = {() => handleQuantity("increase")}><Add/></AdjustButton>
                    </AmountContainer>
                    <Button onClick = {handleAddCart}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product