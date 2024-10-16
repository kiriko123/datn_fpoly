import React from 'react'
import { Link } from 'react-router-dom'
import './HotProductButton.css'

const HotProductButton = () => {
  return (
    <Link to='/product' className='hot-product-btn'>
        All Products
    </Link>
  )
}

export default HotProductButton