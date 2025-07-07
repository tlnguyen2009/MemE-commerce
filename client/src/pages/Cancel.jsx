import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>⚠️ Payment Canceled</h1>
    <p>You canceled the checkout. No worries — your cart is still here.</p>
    <Link to="/cart">Return to Cart</Link>
  </div>
  )
}

export default Cancel