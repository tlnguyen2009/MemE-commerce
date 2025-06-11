import styled, { keyframes } from "styled-components"

const scroll = keyframes `
    0% {
        left: 0;
        transform: translateX(-100%); /* Start fully off-screen on the right */
    }
    100% {
        right: 0;
        transform: translateX(100%); /* Move fully off-screen on the left */
    }
`

const Container = styled.div `
    height: 30px;
    background-color: pink;
    color: black;
    display: flex;
    overflow: hidden; 
    /* Prevents horizontal overflow */
    white-space: nowrap; /*Ensures text stays on one line, even it's longer, try to make the message longer to see */
    justify-content: center;
    align-items: center;
`
const Content = styled.div `
    display: inline-block;
    font-weight: 500;
    
    animation: ${scroll} 20s linear infinite;
`
const Spacer = styled.div`
  display: inline-block;
  width:  ${({ textLength }) => `calc(100vw - ${2 * textLength}px)`}; /* Space between texts equal to the screen width */
`;

const Announcement = () => {
    const text = 'Free Shipping on Orders Over $50!';

    // Get the approximate pixel width of the text
  const textLength = text.length * 8
  return (
    <Container>
        <Content> 
            ${text}
            <Spacer textLength={textLength}/>
            ${text}
        </Content>
    </Container>
  )
}

export default Announcement