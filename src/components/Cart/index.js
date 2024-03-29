import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const onClearCartList = () => {
        removeAllCartItems()
      }

      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="removeall-container">
                  <button
                    className="remove-all-button"
                    onClick={onClearCartList}
                    data-testid="remove"
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <CartSummary cartList={cartList} />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
