import { Facebook, Instagram, Mail, Phone, Room, Twitter } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    display: flex;
    ${mobile`
        flex-direction: column;
    `}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1``

const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const Iconwrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white; /*contents' colors*/
    background-color: #${props=>props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile`
        display: none;
    `}
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none; /*getting rid of "dot" in front of each list item*/
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile`
        background-color: #eee;
    `}
`

const ContactItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

const Payment = styled.img`
    width: 40%;
    cursor: pointer;
`

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>MEME.</Logo>
            <Desc>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Similique sunt placeat quisquam quas consequatur laborum quae illum voluptatum distinctio aperiam nesciunt maiores dolor, 
                necessitatibus quidem soluta temporibus dolore beatae? Quae.
            </Desc>
            <SocialContainer>
                <Iconwrapper color ='3B5999'><Facebook/></Iconwrapper> 
                <Iconwrapper color ='E4405F'><Instagram/></Iconwrapper>
                <Iconwrapper color ='55ACEE'><Twitter/></Iconwrapper>
            </SocialContainer>
        </Left>
        <Center>
            <Title> Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Summer meme</ListItem>
                <ListItem>All season meme</ListItem>
                <ListItem>My account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Room style = {{marginRight: "10px"}}/> xxx Park Ave, Worcester, MA 016xx
            </ContactItem>
            <ContactItem>
                <Phone style = {{marginRight: "10px"}}/> +1 (774) 808-xxxx
            </ContactItem>
            <ContactItem>
                <Mail style = {{marginRight: "10px"}}/> ntl@meme.com
            </ContactItem>
            <Payment src = "/public/Assets/payment_img.png"></Payment>
        </Right>
    </Container>
  )
}

export default Footer