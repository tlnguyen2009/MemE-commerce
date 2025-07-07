import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../Components/Announcement"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { mobile } from "../responsive"

import { useDispatch, useSelector } from "react-redux"
import {updateQuantity} from "../redux/cartRedux"
import axios from "axios"

const Container= styled.div` `
const Wrapper = styled.div` 
    padding: 20px;
    ${mobile`
        padding: 10px;
    `}
`
const Title = styled.h1` 
    font-weight: 300;
    text-align: center;
`
const Top = styled.div` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    ${mobile`
        padding: 20px;

    `}
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props)=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};

    transition: transform 0.1s ease;
    &:active {
        transform: scale(0.98);
    }    
`

const TopTexts = styled.div`
    ${mobile`
        display: none;
    `}
`

const Text = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px
`

const Bottom = styled.div` 
    display: flex;
    justify-content: space-between;
    padding-top: 20px;

    ${mobile`
        flex-direction: column;
    `}
`

const Info = styled.div` 
    flex: 3; // take 3 parts compared to "Summary" below in "Bottom" box
    padding: 30px;
`

const CartHeader = styled.div`
    display: flex;
    margin-bottom: 1rem;
`

const InfoHeader = styled.div`
    flex: 2; //take 2 parts compare to "OtherHeaders" below in "CartHeader" box
    display: flex;
`

const OthersHeader = styled.div`
    flex: 1; //take 1 part compare to "" above in "CartHeader" box
    display: flex;
    align-items: center;
    justify-content: center;
`

const ItemInfo = styled.div`
    font-weight: 700;
    font-size: large;
`

const PriceEach = styled.div`
    display: flex;
    flex: 1;
    font-weight: 700;
    font-size: large;
    justify-content: center;
`

const Qty = styled.div`
    display: flex;
    flex: 2;
    font-weight: 700;
    font-size: large;
    justify-content: center;
`

const Total = styled.div`
    display: flex;
    flex: 1;
    font-weight: 700;
    font-size: large;
    justify-content: center;
`

const Product = styled.div`
    display: flex;
    margin-bottom: 1rem;
`

const ProductDetail = styled.div`
    flex: 2; //take 2 parts compare to "PriceDetail" below in "Product" box
    display: flex;
    ${mobile`
        align-items: center;
    `}
`

const Image = styled.img`
    width: 200px;
    border: 2px solid black;
    ${mobile`
        width: 150px;
        height: 150px;
    `}
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const ProductName = styled.span` 
    font-size: large;
    padding: 5px;
    ${mobile`
        font-size: small;
    `}
`

const ProductId = styled.span` 
    font-size: large;
    padding: 5px;
    ${mobile`
        font-size: small;
    `}
`

const PriceDetail = styled.div` 
    flex: 1; //take 1 part compare to "ProductDetail" above in "Product" box
    display: flex;
    align-items: center;
    justify-content: center;

    ${mobile`
        flex-direction: column;
    `}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 770;
    flex: 2;
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

    ${mobile` 
        font-size:small;
    `}
`

const ProductPrice = styled.div` 
    display: flex;
    flex: 1;
    font-weight: 500;
    justify-content: center;

    ${mobile` 
        margin: 0px;
    `}
`

const ProductTotal = styled.div`
    display: flex;
    flex: 1;
    font-weight: 600;
    justify-content: center;
`

const Hr = styled.hr` 
    background-color: #eee;
    border: none;
    height: 2px;
    margin: 10px 0px 10px 0px;

`

const Summary = styled.div`
    flex: 1; // take 1 part compared to "Info" above in "Bottom" box
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
    overflow-y: scroll;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div` 
    margin: 30px;
    display: flex;
    font-weight: ${props => props.$istotal === "total" && "500"};
    font-size: ${props => props.$istotal === "total" && "24px"};
`

const SummaryItemText = styled.span`

`

const SummaryItemPrice = styled.span`
    padding-left: 10px;
`

const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s ease;
    &:active {
        transform: scale(0.98);
    }
`

const Cart = () => {
  //Apply Redux
  const cart = useSelector((state) => state.cart)
  /* console.log(cart) */
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
        const res = await axios.post(
            `http://localhost:5000/api/stripes/create-checkout-session`, 
            { products: cart.products, }
        );
        
        window.location.href = res.data.url; // Stripe will handle the payment page
    } catch (err) {
        console.log(err);
    }

  };

  return (
    <Container>
        <Navbar/> 
        <Announcement/> 
        <Wrapper>
            <Title>YOUR BAG</Title>
            
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <Text>Shopping Bag ({cart.quantity})</Text>
                    <Text>Wish list (0)</Text>
                </TopTexts>
                <TopButton type = "filled">CHECK OUT</TopButton>
            </Top>

            <Bottom>
                <Info>
                <CartHeader>
                    <InfoHeader>
                        <ItemInfo>Item</ItemInfo>
                    </InfoHeader>
                    <OthersHeader>
                        <PriceEach> Price </PriceEach>
                        <Qty> Qty </Qty>
                        <Total> Total </Total>
                    </OthersHeader>
                </CartHeader>

                <Hr/> 
                {cart.products.map(eachProduct => (
                    <div key={eachProduct._id}>
                        <Product>
                            <ProductDetail>
                                <Image src= {eachProduct.img}></Image>
                                <Details>
                                    <ProductName> <b>Product: </b>{eachProduct.title} </ProductName>
                                    <ProductId> <b>ID: </b>{eachProduct._id} </ProductId>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductPrice> $ {eachProduct.price.toFixed(2)} </ProductPrice>
                                <AmountContainer>
                                    <AdjustButton onClick={() => dispatch(updateQuantity({ _id: eachProduct._id, type: 'dec' }))}><Remove/></AdjustButton>
                                    <Amount>{eachProduct.thisProductQuantity}</Amount>
                                    <AdjustButton onClick={() => dispatch(updateQuantity({ _id: eachProduct._id, type: 'inc' }))}><Add/></AdjustButton>
                                </AmountContainer>
                                <ProductTotal> $ {eachProduct.thisProductTotal.toFixed(2)} </ProductTotal>
                            </PriceDetail>
                        </Product>
                        <Hr/>
                    </div>    
                ))}
                </Info>
                
                <Summary>
                    <SummaryTitle>Order Summary</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal: </SummaryItemText>
                        <SummaryItemPrice> {cart.subtotal}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Tax: </SummaryItemText>
                        <SummaryItemPrice>{(cart.subtotal * 0.0625).toFixed(2)}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Discount: </SummaryItemText>
                        <SummaryItemPrice></SummaryItemPrice>
                    </SummaryItem>
                    <Hr/>
                    <SummaryItem $istotal = "total">
                        <SummaryItemText>Grand Total: </SummaryItemText>
                        <SummaryItemPrice>{(cart.subtotal * 0.0625 + cart.subtotal).toFixed(2)}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryButton onClick={handleCheckout}>CHECK OUT NOW!</SummaryButton>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart