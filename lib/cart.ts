import { Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  updatedAt: number
}

export class CartManager {
  private readonly CART_KEY = 'omnika_cart'
  private readonly LAST_ORDER_KEY = 'omnika_last_order'

  constructor() {
    this.migrateOldCartData()
    this.initializeCart()
  }

  private migrateOldCartData(): void {
    // Migrate old cart keys
    const oldKeys = ['cart', 'basket', 'demo_cart', 'shopping_cart']
    let migratedData: CartItem[] = []

    oldKeys.forEach(key => {
      try {
        const oldData = localStorage.getItem(key)
        if (oldData) {
          const parsed = JSON.parse(oldData)
          if (Array.isArray(parsed)) {
            migratedData = [...migratedData, ...parsed]
          } else if (parsed.items && Array.isArray(parsed.items)) {
            migratedData = [...migratedData, ...parsed.items]
          }
          localStorage.removeItem(key) // Clean up old key
        }
      } catch (error) {
        console.warn(`Failed to migrate cart data from ${key}:`, error)
        localStorage.removeItem(key) // Clean up invalid data
      }
    })

    // If we have migrated data, save it to new format
    if (migratedData.length > 0) {
      const cart: Cart = {
        items: migratedData,
        updatedAt: Date.now()
      }
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
    }
  }

  private initializeCart(): void {
    if (!localStorage.getItem(this.CART_KEY)) {
      const emptyCart: Cart = {
        items: [],
        updatedAt: Date.now()
      }
      localStorage.setItem(this.CART_KEY, JSON.stringify(emptyCart))
    }
  }

  public get(): Cart {
    try {
      const cartData = localStorage.getItem(this.CART_KEY)
      if (!cartData) {
        return { items: [], updatedAt: Date.now() }
      }
      return JSON.parse(cartData)
    } catch (error) {
      console.error('Failed to parse cart data:', error)
      return { items: [], updatedAt: Date.now() }
    }
  }

  public set(cart: Cart): void {
    cart.updatedAt = Date.now()
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
    this.dispatchStorageEvent()
  }

  public add(product: Product, quantity: number = 1): void {
    const cart = this.get()
    const existingItem = cart.items.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product, quantity })
    }

    this.set(cart)
  }

  public remove(productId: string): void {
    const cart = this.get()
    cart.items = cart.items.filter(item => item.product.id !== productId)
    this.set(cart)
  }

  public updateQuantity(productId: string, quantity: number): void {
    const cart = this.get()
    const item = cart.items.find(item => item.product.id === productId)
    
    if (item) {
      if (quantity <= 0) {
        this.remove(productId)
      } else {
        item.quantity = quantity
        this.set(cart)
      }
    }
  }

  public clear(): void {
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
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  public isEmpty(): boolean {
    return this.get().items.length === 0
  }

  public getItem(productId: string): CartItem | null {
    const cart = this.get()
    return cart.items.find(item => item.product.id === productId) || null
  }

  public hasItem(productId: string): boolean {
    return this.getItem(productId) !== null
  }

  public getItemQuantity(productId: string): number {
    const item = this.getItem(productId)
    return item ? item.quantity : 0
  }

  public canAdd(product: Product, quantity: number = 1): boolean {
    const currentQuantity = this.getItemQuantity(product.id)
    const maxQuantity = Math.min(10, product.stock_qty)
    return (currentQuantity + quantity) <= maxQuantity
  }

  public getLastOrder(): any {
    try {
      const lastOrder = localStorage.getItem(this.LAST_ORDER_KEY)
      return lastOrder ? JSON.parse(lastOrder) : null
    } catch (error) {
      console.error('Failed to parse last order:', error)
      return null
    }
  }

  public setLastOrder(order: any): void {
    localStorage.setItem(this.LAST_ORDER_KEY, JSON.stringify(order))
  }

  private dispatchStorageEvent(): void {
    // Dispatch custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { cart: this.get() }
      }))
    }
  }

  // Listen for storage events from other tabs/windows
  public subscribe(callback: (cart: Cart) => void): () => void {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === this.CART_KEY && event.newValue) {
        try {
          const cart = JSON.parse(event.newValue)
          callback(cart)
        } catch (error) {
          console.error('Failed to parse cart from storage event:', error)
        }
      }
    }

    const handleCartUpdate = (event: CustomEvent) => {
      callback(event.detail.cart)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cartUpdated', handleCartUpdate as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener)
    }
  }
}

// Global cart instance
export const cartManager = new CartManager()

// React Hook for cart
export function useCart() {
  const [cart, setCart] = React.useState<Cart>(cartManager.get())

  React.useEffect(() => {
    const unsubscribe = cartManager.subscribe((updatedCart) => {
      setCart(updatedCart)
    })

    return unsubscribe
  }, [])

  const addToCart = (product: Product, quantity: number = 1) => {
    cartManager.add(product, quantity)
  }

  const removeFromCart = (productId: string) => {
    cartManager.remove(productId)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    cartManager.updateQuantity(productId, quantity)
  }

  const clearCart = () => {
    cartManager.clear()
  }

  const cartCount = cartManager.count()
  const cartTotal = cartManager.total()
  const isEmpty = cartManager.isEmpty()

  return {
    cart,
    cartCount,
    cartTotal,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    canAdd: cartManager.canAdd.bind(cartManager),
    getItemQuantity: cartManager.getItemQuantity.bind(cartManager)
  }
}
