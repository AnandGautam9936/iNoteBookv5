import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg px-3" style={{ background: "#1E1E2F", color: "#fff" }}>
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link className="navbar-brand fw-bold" to="/" style={{ color: "#D1D5DB" }}>
            <span style={{ fontSize: "1.5rem" }}>📖</span> iNoteBook
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              backgroundColor: "#343a40"
            }}
          >
            <span className="navbar-toggler-icon" style={{
              filter: "invert(1)",
              width: "24px",
              height: "24px"
            }}></span>
          </button>

          {/* Links */}
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

            {/* Auth Buttons (Right Side) */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
              {!localStorage.getItem("token") ? (
                <>
                  <Link className="btn btn-secondary my-1 my-lg-0 mx-lg-1 text-white" to="/login">
                    🔐 Login
                  </Link>
                  <Link className="btn btn-secondary my-1 my-lg-0 mx-lg-1 text-white" to="/signup">
                    📝 Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogoutClick}
                  className="btn btn-secondary my-1 my-lg-0 mx-lg-1 text-white"
                >
                  🔓 Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
