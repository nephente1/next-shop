'use client'

import { useDispatch } from 'react-redux';
import { ADD_TO_CART, ProductData } from '@/redux/cartStore';
import { MoviesTypes } from '../api/movies/route';

export default function AddToCartButton({productDetails}: {productDetails: ProductData | MoviesTypes}) {
  const dispatch = useDispatch();

  const addToCart = (e: React.MouseEvent) => {
    dispatch(ADD_TO_CART(productDetails))
    e.preventDefault()
  }

  return (
    <button type="button" role="button" onClick={(e) => addToCart(e)}>Add to Cart</button>
  )
}