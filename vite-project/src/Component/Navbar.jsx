import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCart } from "../Redux/Feature/cartSlice";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const cart = useSelector(selectCart);
  useEffect(() => {
    console.log(cart.items.length);
  }, [cart]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    setUser(user);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");

    window.location.href = "/login";
  };
  return (
    <div className="top-nav">
      <div className="inner-nav">
        <Link to={"/home"}>
          <div>Home</div>
        </Link>
        {user ? (
          <>
            <div onClick={handleLogout}>Logout</div>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <div>Login</div>
            </Link>
          </>
        )}

        <Link to={"/cart"}>
          Cart{" "}
          <span style={{ color: "red", fontSize: "1.5rem" }}>
            {cart.items.length === 0 ? "" : cart.items.length}
          </span>
        </Link>

        {user ? <div>{user.email}</div> : <></>}
      </div>
    </div>
  );
};

export default Navbar;
