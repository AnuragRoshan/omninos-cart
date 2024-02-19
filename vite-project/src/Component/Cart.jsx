import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../Redux/Feature/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const increaseQuantity = (itemId) => {
    dispatch(updateQuantity({ id: itemId, quantity: 1 }));
  };

  const decreaseQuantity = (itemId) => {
    dispatch(updateQuantity({ id: itemId, quantity: -1 }));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleCheckout = () => {
    dispatch(clearCart()); // Clear the cart
    alert("Checkout Successful");
    window.location.href = "/home";
  };

  const calculateTotalBill = () => {
    const total = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total.toFixed(2); // Set precision to two digits after the decimal point
  };

  // useEffect(() => {
  //   console.log(cart.items);
  // }, [cart]);

  return (
    <div className="product-top">
      <div className="product-inner-top">
        <h1>Cart</h1>
        <div className="product-container">
          {cart.items.length === 0 ? (
            <> Add Some Items To Cart</>
          ) : (
            <>
              {cart.items.map((item) => {
                return (
                  <div className="cart-item" key={item.id}>
                    <div
                      className="product-image"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                    >
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="product-item-details">
                      <h3>{item.title.slice(0, 30)}..</h3>
                      <br />
                      <p>
                        <b>$ {item.price}</b>
                      </p>
                      <div>
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                        <span className="item-qty">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  gap: "1rem",
                  fontWeight: "bold",
                }}
              >
                <div>Total Bill: ${calculateTotalBill()}</div>
                <div
                  onClick={handleCheckout}
                  style={{
                    padding: "0.8rem 1.5rem",
                    cursor: "pointer",
                    border: "1px solid grey",
                  }}
                >
                  CheckOut
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
