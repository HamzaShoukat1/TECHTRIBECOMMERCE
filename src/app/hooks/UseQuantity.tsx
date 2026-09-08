"use client"
import { useState } from 'react'

export function useQuantity() {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  return { quantity, increaseQuantity, decreaseQuantity }
}
