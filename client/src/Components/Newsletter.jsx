import { Send } from '@mui/icons-material'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`

const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile`
        text-align: center;
    `}
`

const InputPlace = styled.div`
    width: 30%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: center;
    border: 1px solid lightgray;
    ${mobile`
        width: 90%;
    `}

`
const Input = styled.input`
    border: none; /* make it look like merging, getting rid of this to see */
    flex: 9; /*9 unit*/
    padding-left: 20px;
`
const Button = styled.button`
    flex: 1; /*1 unit combine with 9 units above*/
    border: none;
    background-color: #d340ac;
    color: white;
`

const Newsletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get updates from your favorite products</Desc>
        <InputPlace>
            <Input placeholder='Your email'/>
            <Button> <Send/> </Button>
        </InputPlace>
    </Container>
  )
}

export default Newsletter