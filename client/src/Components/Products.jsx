import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { popularProducts } from '../data'
import { mobile } from '../responsive';
import Product from './Product'

const Container = styled.div`
    
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 2rem; 
    column-gap: 5%; //shouldn't change percentage no matter screen size
    padding: 20px;
    ${mobile`
      row-gap: 15px; 
      padding: 10px;
    `}
`;

const Products = ({cat}) => {
  const [filterProducts, setFilterProducts] = useState([]) //use to save new array created in useEffect() below based on "cat"

  useEffect(()=>{
    let filterArr = [...popularProducts]; //shallow copy of popularProducts array
    console.log(filterArr)

    //if cat exist, sorted new array upon "cat", otherwise, it's still old array
    if (cat !== 'All') { 
      filterArr = filterArr.filter(
          (item) => item.category === cat
      )

      console.log(filterArr)
  
    } 

    setFilterProducts(filterArr)

    // //sort the list
    // if (sort === 'asc') {
    //   filterArr.sort((a, b) => a.price - b.price)
    // } else if (sort === 'desc') {
    //   filterArr.sort((a, b) => b.price - a.price);
    // } else {
      
    // }

  }, [cat]) //re-run logic again when "cat" or "sort" change

  return (
    <Container>
        {filterProducts.map((item) => (
            <Product eachproduct = {item} key = {item.id}/> 
        ))}
    </Container>
  )
}

export default Products