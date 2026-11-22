import { useRef, useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
}

type CartItem = {
  cartItemId: number
  product: Product
}

const products: Product[] = [
  { id: 1, name: 'Widget', price: 19.99 },
  { id: 2, name: 'Gadget', price: 29.99 },
]

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const nextCartItemId = useRef(0)

  function addToCart(product: Product) {
    nextCartItemId.current += 1
    const newItem: CartItem = {
      cartItemId: nextCartItemId.current,
      product,
    }
    setCart((current) => [...current, newItem])
  }

  function removeFromCart(cartItemId: number) {
    setCart((current) => current.filter((item) => item.cartItemId !== cartItemId))
  }

  return (
    <main>
      {products.map((product) => (
        <section key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price.toFixed(2)}</p>
          <button type="button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </section>
      ))}

      <section aria-labelledby="cart-summary-title">
        <h1 id="cart-summary-title">Cart Summary</h1>
        <p>Total Items: {cart.length}</p>
        {cart.length > 0 && (
          <ul>
            {cart.map((item) => (
              <li key={item.cartItemId}>
                {item.product.name} - ${item.product.price.toFixed(2)}{' '}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.cartItemId)}
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
