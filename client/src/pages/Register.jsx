/*
Note:
1/ Using onChange to check if a checkbox is checked
    onChange={(event) => setAgreed(event.target.checked)}
where: 
    event is argument
    setAgree() is defined function from useState
    target.checked is built-in function for return True or False when the user check the box

2/
    onSubmit={handleErrorPopup} will automatically pass in the "event" as a variable for handleErrorPopup(event) function

3/ *** ToastContainer
    Apply toast container npm for popping alerts with more modern UI/UX design
*/

import styled from "styled-components"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { mobile } from "../responsive";

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
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    margin-top: 50px;
    background-color: pink;
    ${mobile`
        width: 70%;
    `}
`

const Form = styled.form` 
    display: flex;
    flex-wrap: wrap; //make sure data input doesn't overflown

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
const Agreement = styled.label` 
    font-size: 12px;
    display: flex; 
    align-items: start;
    margin-top: 10px;
    ${mobile`
        font-size: 11px;
        line-height: 1.5;
    `}
`

const Checkbox = styled.input`
    margin: 5px;
    cursor: pointer;
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

const Register = () => {
  const [agreed, setAgreed] = useState(false); //check the agreemnent checkbox
  
  const handleErrorPopup = (e) => {
    e.preventDefault(); //stop page reload because the form normally reload and it make all the info user already input blank
    if(!agreed) { //if agree is FALSE
        toast.error("Please agree to the privacy policy before creating an account.");
        return;
    }
    // Otherwise, account created
    toast.success("Account created! \n 🎉 🎉 🎉 ");
  }

  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form onSubmit={handleErrorPopup}>
                <Input placeholder = "First name"/>
                <Input placeholder = "Last name"/>
                <Input placeholder = "Username"/>
                <Input placeholder = "Email"/>
                <Input placeholder = "Password"/>
                <Input placeholder = "Confirm password"/>
                <Agreement>
                <Checkbox checked={agreed} onChange={(event) => setAgreed(event.target.checked)} type = "checkbox"/>
                    <span> By creating an account, I consent to the processing of my personal
                    data in accordance with the <b> PRIVACY POLICY </b> </span>
                </Agreement>
                
                <Button type = "submit">Create Account</Button>
            </Form>
            <ToastContainer/>
        </Wrapper>
    </Container>
  )
}

export default Register