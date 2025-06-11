import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div` 
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5), 
        rgba(255,255,255,0.5)
    ), 
    url('/public/Assets/welcome_register.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: baseline;
    justify-content: center;
    ${mobile`
        background-size: contain; //it will automatically repeat the image to fill up the blank
        background-repeat: no-repeat; //force it not to repeat
    `}
`

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    margin-top: 50px;
    background-color: #f9fcfc;
    ${mobile`
        width: 70%;
    `}
`

const Form = styled.form` 
    display: flex;
    flex-direction: column;

`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 900;
`
const Input = styled.input` 
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Button = styled.button` 
    padding: 12px;
    border: none;
    margin-top: 10px;
    background-color: #1837b2;
    color: white;
    font-weight: 500;
    cursor: pointer;
        
    &:active { // animation when clicking 
        transform: scale(0.96);
    }
`

const Link = styled.a`
    margin-top: 20px;
    color: #4c4cfb;
    font-style: normal;
    text-decoration-line: underline;
    cursor: pointer;
`
const CreateAccount = styled.div` 
    color: gray;
    font-style: italic;
`
const Login = () => {
  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <CreateAccount> Don't have an account? <Link>Sign up</Link></CreateAccount>
            <Form>
                <Input placeholder = "Username"/>
                <Input placeholder = "Password"/>
                
                <Button type = "submit">Login</Button>
                <Link>Forget password?</Link>    
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login