/*
trouble i have:
1/ seems like the url only works with lowercase like "all", not "All". When I have the "cat" parameter with "All", it just return the an empty array for "filterArr". So when you type "http://localhost:3000/products/All", it will automatically convert to "http://localhost:3000/products/all"
*/

import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { popularProducts } from '../data'
import { mobile } from '../responsive';
import Product from './Product'
import axios from 'axios'

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

const Products = ({cat, sort, limit}) => {
  const [filterProducts, setFilterProducts] = useState([]) //use to save new array created in useEffect() below based on "cat"

  useEffect(()=>{
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat && cat !== 'all' //if "cat" has value AND "cat" not 'all'
              ? `http://localhost:5000/api/products?category=${cat}` //api help us to find corresponding category -> read api/product.js
              : `http://localhost:5000/api/products`
        )
        // console.log(res.data) // print out to see how data array look like

        let products = res.data //put data array from response (res) above into a variable to filter
        
        //Apply sort
        if (sort === 'asc') {
          products.sort((a,b) => a.price - b.price);
        } else if (sort = 'desc') {
          products.sort((a,b) => b.price - a.price);
        } else {
          products.sort((a,b) => a.createdAt - b.createdAt);
        }

        // Apply limit
        if (limit) {
          products = products.slice(0, limit);
        }
        
        console.log(products)
        setFilterProducts(products)
      } catch (err) {};
    }
    getProducts();
  }, [cat, sort]) //re-run logic again when "cat" or "sort" change

  //Using filterProducts above to show (map) results
  return (
    <Container>
        {filterProducts.map((item) => (
            <Product eachproduct = {item} key = {item._id}/> 
        ))}
    </Container>
  )
}

export default Products