import { createContext, useReducer } from 'react'
import { Cart } from './types'

export const cartStorage = {
  save: (userId: string, cart: Cart) => {
    try {
      localStorage.setItem(`cart-${userId}`, JSON.stringify(cart))
    } catch (error) {
      console.error('Fault with save to local storage:', error)
    }
  },

  get: (userId: string): Cart | null => {
    try {
      const cartData = localStorage.getItem(`cart-${userId}`)
      return cartData ? JSON.parse(cartData) : null
    } catch (error) {
      console.error('Fault with get from local storage:', error)
      return null
    }
  },

  remove: (userId: string) => {
    try {
      localStorage.removeItem(`cart-${userId}`)
    } catch (error) {
      console.error('Fault with remove from local storage:', error)
    }
  },
}
