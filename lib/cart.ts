import React from 'react'
import { Product } from './products'

export interface CartItem {
  sku: string
  name: string
  price: number
  quantity: number
  image: string
  stock_qty: number
}

export interface Cart {
  items: CartItem[]
  updatedAt: number
}

class CartManager {
  private readonly CART_KEY = 'omnika_cart'
  private readonly LAST_ORDER_KEY = 'omnika_last_order'

  constructor() {
    this.migrateOldCartData()
    this.initializeCart()
  }

  private migrateOldCartData(): void {
    if (typeof window === 'undefined') return // Skip during SSR

    const oldKeys = ['cart', 'basket', 'demo_cart', 'shopping_cart']
    
    oldKeys.forEach(key => {
      try {
        const oldData = localStorage.getItem(key)
        if (oldData) {
          const parsed = JSON.parse(oldData)
          if (parsed && Array.isArray(parsed)) {
            // Convert old array format to new format
            const items = parsed.map((item: any) => ({
              sku: item.sku || item.id || '',
              name: item.name || '',
              price: item.price || 0,
              quantity: item.quantity || 1,
              image: item.image || '',
              stock_qty: item.stock_qty || 1
            })).filter((item: CartItem) => item.sku && item.name)
            
            if (items.length > 0) {
              const newCart: Cart = {
                items,
                updatedAt: Date.now()
              }
              localStorage.setItem(this.CART_KEY, JSON.stringify(newCart))
            }
          }
          localStorage.removeItem(key) // Clean up old data
        }
      } catch (error) {
        console.warn(`Failed to migrate cart data from ${key}:`, error)
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key) // Clean up invalid data
        }
      }
    })
  }

  private initializeCart(): void {
    if (typeof window === 'undefined') return // Skip during SSR

    const existingCart = localStorage.getItem(this.CART_KEY)
    if (!existingCart) {
      const emptyCart: Cart = {
        items: [],
        updatedAt: Date.now()
      }
      localStorage.setItem(this.CART_KEY, JSON.stringify(emptyCart))
    }
  }

  public get(): Cart {
    if (typeof window === 'undefined') {
      return { items: [], updatedAt: Date.now() }
    }

    try {
      const cartData = localStorage.getItem(this.CART_KEY)
      if (cartData) {
        return JSON.parse(cartData)
      }
    } catch (error) {
      console.warn('Failed to parse cart data:', error)
    }
    
    return { items: [], updatedAt: Date.now() }
  }

  public set(cart: Cart): void {
    if (typeof window === 'undefined') return

    cart.updatedAt = Date.now()
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
    this.dispatchCartUpdated()
  }

  public add(sku: string, quantity: number = 1, product?: Product): void {
    if (typeof window === 'undefined') return

    const cart = this.get()
    const existingItem = cart.items.find(item => item.sku === sku)

    if (existingItem) {
      existingItem.quantity += quantity
      if (product && existingItem.stock_qty < product.stock_qty) {
        existingItem.stock_qty = product.stock_qty
      }
    } else if (product) {
      cart.items.push({
        sku: product.sku,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0] || '',
        stock_qty: product.stock_qty
      })
    }

    this.set(cart)
  }

  public remove(sku: string): void {
    if (typeof window === 'undefined') return

    const cart = this.get()
    cart.items = cart.items.filter(item => item.sku !== sku)
    this.set(cart)
  }

  public updateQuantity(sku: string, quantity: number): void {
    if (typeof window === 'undefined') return

    const cart = this.get()
    const item = cart.items.find(item => item.sku === sku)
    
    if (item) {
      if (quantity <= 0) {
        this.remove(sku)
      } else {
        item.quantity = Math.min(quantity, item.stock_qty)
        this.set(cart)
      }
    }
  }

  public clear(): void {
    if (typeof window === 'undefined') return

    const emptyCart: Cart = {
      items: [],
      updatedAt: Date.now()
    }
    this.set(emptyCart)
  }

  public count(): number {
    const cart = this.get()
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  public total(): number {
    const cart = this.get()
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  public isEmpty(): boolean {
    const cart = this.get()
    return cart.items.length === 0
  }

  public getItem(sku: string): CartItem | undefined {
    const cart = this.get()
    return cart.items.find(item => item.sku === sku)
  }

  public hasItem(sku: string): boolean {
    return this.getItem(sku) !== undefined
  }

  public getItemQuantity(sku: string): number {
    const item = this.getItem(sku)
    return item ? item.quantity : 0
  }

  public canAdd(sku: string, quantity: number = 1): boolean {
    const item = this.getItem(sku)
    if (!item) return true // New item can always be added
    
    const newTotal = item.quantity + quantity
    return newTotal <= item.stock_qty
  }

  public getLastOrder(): any {
    if (typeof window === 'undefined') return null

    try {
      const orderData = localStorage.getItem(this.LAST_ORDER_KEY)
      return orderData ? JSON.parse(orderData) : null
    } catch (error) {
      console.warn('Failed to parse last order data:', error)
      return null
    }
  }

  public setLastOrder(order: any): void {
    if (typeof window === 'undefined') return

    localStorage.setItem(this.LAST_ORDER_KEY, JSON.stringify(order))
  }

  private dispatchCartUpdated(): void {
    if (typeof window === 'undefined') return

    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { cart: this.get() }
    }))
  }
}

// Global cart manager instance
export const cartManager = new CartManager()

// React hook for cart
export function useCart() {
  const [cart, setCart] = React.useState<Cart>(cartManager.get())
  const [cartCount, setCartCount] = React.useState<number>(cartManager.count())

  React.useEffect(() => {
    const updateCart = () => {
      const newCart = cartManager.get()
      setCart(newCart)
      setCartCount(cartManager.count())
    }

    // Listen for cart updates from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === cartManager['CART_KEY']) {
        updateCart()
      }
    }

    // Listen for custom cart updated events
    const handleCartUpdated = () => {
      updateCart()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('cartUpdated', handleCartUpdated)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('cartUpdated', handleCartUpdated)
      }
    }
  }, [])

  return {
    cart,
    cartCount,
    add: cartManager.add.bind(cartManager),
    remove: cartManager.remove.bind(cartManager),
    updateQuantity: cartManager.updateQuantity.bind(cartManager),
    clear: cartManager.clear.bind(cartManager),
    count: cartManager.count.bind(cartManager),
    total: cartManager.total.bind(cartManager),
    isEmpty: cartManager.isEmpty.bind(cartManager),
    getItem: cartManager.getItem.bind(cartManager),
    hasItem: cartManager.hasItem.bind(cartManager),
    canAdd: cartManager.canAdd.bind(cartManager)
  }
}
