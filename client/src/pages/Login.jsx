import styled from "styled-components"
import { mobile } from "../responsive"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/loginAPICall"

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

    &:disabled {
        color: white;
        cursor: not-allowed;
        background-color: gray;
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

const Error = styled.div` 
    color: red;
`

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const {isFetching, error} = useSelector((state) => state.user)
  
  const handleLogin = (e) => {
    e.preventDefault(); //stop the page from reloading after submitting the "form"
    login(dispatch, {username, password}) //call from loginAPICall.js
  }

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <CreateAccount> Don't have an account? <Link>Sign up</Link></CreateAccount>
            <Form onSubmit={handleLogin}> {/* onSubmit={...} with click on "Login" button or with "Enter key" */}
                <Input 
                    placeholder = "Username"
                    onChange={(e) => setUsername(e.target.value)}    
                />
                <Input 
                    placeholder = "Password"
                    type= "password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" disabled={isFetching}>Login</Button> 
                {error && <Error>Something wrong...</Error>} {/* if error? => warning */}             
                <Link>Forget password?</Link>    
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login