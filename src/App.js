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

  incrementCartItemQuantity = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))

  decrementCartItemQuantity = id => {
    const updateQuantity = () =>
      this.setState(prev => ({
        cartList: prev.cartList.filter(each => each.quantity !== 0),
      }))

    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      }),
      updateQuantity,
    )
  }

  removeAllCartItems = () => this.setState({cartList: []})

  removeCartItem = id => {
    const {cartList} = this.state

    const updatedList = cartList.filter(each => each.id !== id)

    this.setState({cartList: updatedList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const inCart = cartList.find(each => each.id === product.id)
    if (inCart) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === product.id) {
            return {...each, quantity: each.quantity + product.quantity}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
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
