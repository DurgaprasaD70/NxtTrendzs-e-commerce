import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const isThere = cartList.some(eachProduct => eachProduct.id === product.id)
    console.log(isThere)
    if (isThere) {
      const updateList = cartList.filter(eachProduct => {
        if (eachProduct.id === product.id) {
          eachProduct.quantity += 1
          return eachProduct
        }
        return eachProduct
      })
      this.setState({cartList: updateList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
    console.log(cartList)
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filterCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateQuantityItemList = cartList.filter(eachItem => {
      const {quantity} = eachItem
      if (eachItem.id === id) {
        eachItem.quantity = quantity + 1
        return eachItem
      }
      return eachItem
    })
    this.setState({cartList: updateQuantityItemList})
  }


  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateQuantityItemList = cartList.filter(eachItem => {
      const {quantity} = eachItem
      if (eachItem.id === id && quantity > 1) {
        eachItem.quantity = quantity - 1
        return eachItem
      }
      if (quantity === 1) {
        eachItem.quantity = quantity - 1
        return false
      }
      return eachItem
    })
    this.setState({cartList: updateQuantityItemList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
