import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const [creds, setCreds] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation before making request
        if (!creds.email || !creds.password) {
            setErrors({
                email: creds.email ? "" : "Email is required",
                password: creds.password ? "" : "Password is required",
            });
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save and redirect
            localStorage.setItem('token', json.token);
            props.showAlert("Logged in Successfully", "success");
            navigate("/");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });

        // Live validation
        if (e.target.name === "email" && e.target.value.includes("@")) {
            setErrors((prev) => ({ ...prev, email: "" }));
        }
        if (e.target.name === "password" && e.target.value.length >= 5) {
            setErrors((prev) => ({ ...prev, password: "" }));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">🔐 Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group">
                            <span className="input-group-text">📧</span>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                value={creds.email}
                                onChange={onChange}
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text">🔑</span>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                value={creds.password}
                                onChange={onChange}
                                id="password"
                                name="password"
                                required
                            />
                        </div>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={!creds.email || !creds.password}>
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
