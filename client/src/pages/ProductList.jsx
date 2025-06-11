import styled from "styled-components"
import Announcement from "../Components/Announcement"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import Newsletter from "../Components/Newsletter"
import Products from "../Components/Products"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const Container = styled.div`
    
`

const Title = styled.h1`
    margin: 20px;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;

`

const Filter = styled.div`
    margin: 20px;
`

const FilterText = styled.span` 
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
`

const Select = styled.select`
  padding: 2px;
  border-radius: 8px;
  font-size: 16px;
  ${mobile`
    margin-top: 5px;
  `}
`

const Option = styled.option` 
    &:disabled {
    color: #888;
    font-style: italic;
    }
`

const ProductList = () => {
  const location = useLocation();
  // console.log(location.pathname.split('/')[2])
  const category = location.pathname.split('/')[2] //extract the path when user click on one of "Categories" from "Home"
//   console.log(category)

  const[filterCat, setFilterCat] = useState(category) //set default as URL from location.pathname...will change later when user pick "selection" below
  const[sort, setSort] = useState('newest')

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>Cat meme</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select onChange={(e) => setFilterCat(e.target.value)}> 
                    <Option> All </Option>
                    <Option>funny-meme</Option>
                    <Option>crying-meme</Option>
                    <Option>really-meme</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                    <Option value = "newest"> Newest</Option>
                    <Option value = "asc"> Price (asc)</Option>
                    <Option value = "desc"> Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={filterCat} sort = {sort}/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList