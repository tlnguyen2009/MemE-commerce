import styled from 'styled-components'
import Badge from '@mui/material/Badge'
import Search from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { mobile } from '../responsive'

//custom styled component
const Container = styled.div `
    height: 60px;
    ${mobile`
        height: 50px;
    `}
`
const Wrapper = styled.div `
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile`
        padding: 7px 0px;
    `}
`

//left
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span `
    font-size: 14px;
    cursor: pointer;
    ${mobile`
        display: none;
    `}
`

const Searchcontainer = styled.div` //search box
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile`
        margin-left: 5px;s
    `}
`

const Input = styled.input `
    border: none;
    ${mobile`
        width: 50px;
    `}
`
//center
const Center = styled.div`
    flex: 1
`

const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
    ${mobile`
        font-size: 24px;
    `}
`

//right
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile`
        justify-content: center;
        flex: 2;
    `}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile`
        font-size: 12px;
        margin-left: 10px;        
    `}
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language> EN </Language>
                <Searchcontainer>
                <Input placeholder='Search...'/>    
                <Search style={{color: "gray", fontSize: 16}}/>
                </Searchcontainer>
            </Left>

            <Center>
                <Logo> MEME. </Logo>
            </Center>

            <Right>
                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
                <MenuItem>
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar