import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let total = 0
      cartList.forEach(each => {
        total += each.quantity * each.price
        return false
      })

      return (
        <div className="cartSummary">
          <h1 className="cartSummary-heading">
            Order Total:<span className="cartSummary-span"> Rs {total}/-</span>
          </h1>
          <p className="cartSummary-para">{cartList.length} items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
