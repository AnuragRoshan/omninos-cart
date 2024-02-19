import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import Home from "./Page/Home";
import { useEffect, useState } from "react";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import Login from "./Component/Login";
import Cart from "./Component/Cart";
import Signup from "./Component/Signup";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    setUser(user);
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <>
          <Routes>
            <Route exact path="/home" element={user ? <Home /> : <Login />} />
            <Route exact path="/" element={user ? <Home /> : <Login />} />
            <Route exact path="/login" element={user ? <Home /> : <Login />} />
            <Route
              exact
              path="/signup"
              element={user ? <Home /> : <Signup />}
            />
            <Route exact path="/cart" element={user ? <Cart /> : <Login />} />
          </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
