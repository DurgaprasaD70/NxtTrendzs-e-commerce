// Write your code here
import './index.css'

const CartSummary = props => {
  const {cartList} = props
  const totalItems = cartList.length
  let totalPrice = 0
  cartList.forEach(eachList => {
    const {price, quantity} = eachList
    const total = price * quantity
    totalPrice += total
  })

  return (
    <div className="cart-summary-main-container">
      <div className="cart-summary-container">
        <h1 className="total-amount-text">
          Order Total:
          <span className="total-price-text">RS {totalPrice}/-</span>
        </h1>
        <p className="items-in-cart-text">{totalItems} items in cart</p>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  )
}

export default CartSummary
