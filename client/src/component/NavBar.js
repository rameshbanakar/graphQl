import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Quote App
        </Link>
        <ul id="nav-mobile" className="right ">
          {token ? (
            <>
              <li>
                <Link to="/profile">profile</Link>
              </li>
              <li>
                <Link to="/create">create</Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() =>{
                      localStorage.removeItem("token");
                      navigate("/login")
                  } }
                  className="btn red"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">signin</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
