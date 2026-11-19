import { useState, type FormEvent } from 'react'

type Product = {
  id: string
  name: string
  price: number
  quantity: number
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ShoppingCart() {
  const [products, setProducts] = useState<Product[]>([])
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')

  function handleAddProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = productName.trim()
    const price = Number.parseFloat(productPrice)

    if (!name || !Number.isFinite(price) || price < 0) {
      return
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      price,
      quantity: 1,
    }

    setProducts((currentProducts) => [...currentProducts, newProduct])
    setProductName('')
    setProductPrice('')
  }

  function increaseQuantity(id: string) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    )
  }

  function decreaseQuantity(id: string) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product,
      ),
    )
  }

  function removeProduct(id: string) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    )
  }

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  )

  return (
    <main>
      <h1>Simple Shopping Cart</h1>

      <section>
        <h2>Add a Product</h2>
        <form onSubmit={handleAddProduct}>
          <input
            aria-label="Product Name"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            required
          />
          <input
            aria-label="Price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
            required
          />
          <button type="submit">Add to Cart</button>
        </form>
      </section>

      <section>
        <h2>Products in Cart</h2>
        {products.length === 0 ? (
          <p>The cart is empty.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong> - {currency.format(product.price)}
                <br />
                Quantity:{' '}
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${product.name}`}
                  onClick={() => decreaseQuantity(product.id)}
                  disabled={product.quantity === 1}
                >
                  -
                </button>{' '}
                {product.quantity}{' '}
                <button
                  type="button"
                  aria-label={`Increase quantity of ${product.name}`}
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  aria-label={`Remove ${product.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <h2>
        Total Price: <strong>{currency.format(totalPrice)}</strong>
      </h2>
    </main>
  )
}

export default ShoppingCart
