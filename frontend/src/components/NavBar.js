import React from "react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";


function NavBar() {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogoutClick = () =>{
    localStorage.removeItem('token')
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg px-3" style={{ background: "#1E1E2F", color: "#fff" }}>
        <div className="container-fluid">
          {/* Brand Logo with Icon */}
          <Link className="navbar-brand fw-bold" to="/" style={{ color: "#D1D5DB" }}>
            <span style={{ fontSize: "1.5rem" }}>📖</span> iNoteBook
          </Link>

          {/* Navbar Toggler for Mobile View */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "fw-bold text-light border-bottom border-light" : "text-light"}`}
                  to="/"
                >
                  🏡 Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about" ? "fw-bold text-light border-bottom border-light" : "text-light"}`}
                  to="/about"
                >
                  ℹ️ About
                </Link>
              </li>
            </ul>

            {/* Conditional Rendering for Login/Signup or Logout */}
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className="btn btn-secondary mx-1 d-flex align-items-center" to="/login">
                  🔐 Login
                </Link>
                <Link className="btn btn-secondary mx-1 d-flex align-items-center text-white" to="/signup">
                  📝 Sign Up
                </Link>
              </div>
            ) : (
              <button onClick={handleLogoutClick} className="btn btn-secondary d-flex align-items-center">
                🔓 Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
