import styled from 'styled-components'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { mobile } from '../responsive'

const Info = styled.div`
  opacity: 0;
  width: 300px;
  height: 90%; //shouldn't change regardless of screen size because it's percentage based on screen size
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  ${mobile`
    width: 150px;
  `}
`

const Container = styled.div`
  flex: 1;
  display: flex;
  max-width: 300px;
  min-width: 280px;
  margin: 10px;
  height: 350px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  &:hover ${Info} {
    opacity: 1;
  }

  ${mobile`
    max-width: 150px;
    min-width: 140px;
    margin: 5px;
    height: 160px;
  `}
`

const Image = styled.img `
  height: 90%; //shouldn't change regardless of screen size because it's percentage based on screen size
  width: 100%;
  position: absolute;
  top:0;
  left: 0;
`

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  
  &:hover {
    background-color: white;
    transform: scale(1.1);
  }

  ${mobile`
    width: 20px;
    height: 20px;
    margin: 5px;
  `}
`

//Create a styled version of the icon with mobile behavior
const StyledShoppingCart = styled(ShoppingCartOutlined)`
  font-size: 24px;
  ${mobile`
    font-size: 12px !important;
  `}
`;

const StyledSearch= styled(SearchOutlined)`
  font-size: 24px;
  ${mobile`
    font-size: 12px !important;
  `}
`;

const StyledFavoriteBorder = styled(FavoriteBorderOutlined)`
  font-size: 24px;
  ${mobile`
    font-size: 12px !important;
  `}
`;


const Product = ({eachproduct}) => {
  return (
    <Container>
        <Image src = {eachproduct.img}/>
        <Info>
          <Icon>
              <StyledShoppingCart/>
          </Icon>
          <Icon>
              <StyledSearch/>
          </Icon>
          <Icon>
              <StyledFavoriteBorder/>
          </Icon>
        </Info>
    </Container>
  )
}

export default Product
