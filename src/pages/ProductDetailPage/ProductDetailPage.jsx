import React from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../../utils/hooks/useProduct'
import ProductCard from './ProductCard'

const ProductDetailPage = () => {

  return (
    <ProductCard/>
  )
}

export default ProductDetailPage