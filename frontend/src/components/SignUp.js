import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = (props) => {
    const [creds, setcreds] = useState({ name: '', email: '', password: '', cpassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = creds;
        const response = await fetch(`${window.location.origin}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.token);
            navigate("/");
            props.showAlert("Account Created Successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="card p-4 shadow-sm">
                    <h2 className="text-center mb-4">📝 Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <div className="input-group">
                                <span className="input-group-text">👤</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={creds.name}
                                    onChange={onChange}
                                    id="name"
                                    name="name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <div className="input-group">
                                <span className="input-group-text">📧</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={creds.email}
                                    onChange={onChange}
                                    id="email"
                                    name="email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">🔑</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={creds.password}
                                    onChange={onChange}
                                    id="password"
                                    name="password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <div className="input-group">
                                <span className="input-group-text">✅</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={creds.cpassword}
                                    onChange={onChange}
                                    id="cpassword"
                                    name="cpassword"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
