import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../Components/Announcement"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { mobile } from "../responsive"

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

const Product = styled.div`
    display: flex;
    
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

    ${mobile` 
        font-size:small;
    `}
`

const ProductPrice = styled.div` 
    margin-left: 60px;
    font-weight: 500;
    ${mobile` 
        margin: 0px;
    `}
`

const Hr = styled.hr` 
    background-color: #eee;
    border: none;
    height: 2px;
    margin: 10px 0px;

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
`

const Cart = () => {
  return (
    <Container>
        <Navbar/> 
        <Announcement/> 
        <Wrapper>
            <Title>YOUR BAG</Title>
            
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <Text>Shopping Bag (2)</Text>
                    <Text>Wish list (0)</Text>
                </TopTexts>
                <TopButton type = "filled">CHECK OUT</TopButton>
            </Top>

            <Bottom>
                <Info>
                    <Product>
                        <ProductDetail>
                            <Image src= "/public/Assets/product_crying4.jpg"></Image>
                            <Details>
                                <ProductName> <b>Product: </b>cat crying and brushing teeth </ProductName>
                                <ProductId> <b>ID: </b>20091998 </ProductId>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <AmountContainer>
                                <AdjustButton><Remove/></AdjustButton>
                                <Amount>1</Amount>
                                <AdjustButton><Add/></AdjustButton>
                            </AmountContainer>
                            <ProductPrice> $ 1.50 ea. </ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    <Product>
                        <ProductDetail>
                            <Image src= "/public/Assets/product_funny4.jpg"></Image>
                            <Details>
                                <ProductName> <b>Product: </b>cat with silly face </ProductName>
                                <ProductId> <b>ID: </b>17102001 </ProductId>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <AmountContainer>
                                <AdjustButton><Remove/></AdjustButton>
                                <Amount>1</Amount>
                                <AdjustButton><Add/></AdjustButton>
                            </AmountContainer>
                            <ProductPrice> $ 2.00 ea. </ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                
                <Summary>
                    <SummaryTitle>Order Summary</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal: </SummaryItemText>
                        <SummaryItemPrice>$ 3.50</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Tax: </SummaryItemText>
                        <SummaryItemPrice>$ 0.35</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Discount: </SummaryItemText>
                        <SummaryItemPrice>$ - 0.35</SummaryItemPrice>
                    </SummaryItem>
                    <Hr/>
                    <SummaryItem $istotal = "total">
                        <SummaryItemText>Total: </SummaryItemText>
                        <SummaryItemPrice>$ 3.50</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryButton>CHECK OUT NOW!</SummaryButton>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart