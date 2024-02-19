import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addToCart,
  removeFromCart,
  selectCart,
} from "../Redux/Feature/cartSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  //   const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="home-top">
      <div className="home-inner-top">
        {products.length > 0 ? (
          <div className="product-container">
            {products.map((product) => {
              const isInCart = cart.items.some(
                (item) => item.id === product.id
              );
              return (
                <div className="product" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-details">
                    <h3>{product.title.slice(0, 30)}..</h3>
                    <br />
                    <p>{product.description.slice(0, 70)}..</p>
                    <br />
                    <p>
                      <b>$ {product.price}</b>
                    </p>
                    {isInCart ? (
                      <button onClick={() => removeFromCartHandler(product)}>
                        Remove
                      </button>
                    ) : (
                      <button onClick={() => addToCartHandler(product)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
