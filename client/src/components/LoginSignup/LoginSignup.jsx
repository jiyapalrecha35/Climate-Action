import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";

import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleToggleAction = (newAction) => {
        setAction(newAction);
    };

    const validateUsername = (username) => {
        const pattern = /^[A-Z][a-zA-Z0-9]*$/;
        return pattern.test(username);
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const validatePassword = (password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pattern.test(password);
    };

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            toast.error("Please fill all fields!");
            return;
        }

        if (!validateUsername(name)) {
            toast.error("Username should start with a capital letter and should not contain only numbers!");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address!");
            return;
        }

        if (!validatePassword(password)) {
            toast.error("Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.status === 200) {
                toast.success("Sign up successful!");
                localStorage.setItem("userEmail", email);
                navigate('/');
            } else {
                toast.error("Failed to sign up, user already exists!");
            }
        } catch (error) {
            toast.error("Failed to sign up!");
            console.error(error);
        }
    };

    const handleLogin = async () => {
        if (email && password) {
            try {
                const response = await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.status === 200) {
                    toast.success("Login successful!");
                    localStorage.setItem("userEmail", email);
                    navigate('/');
                } else {
                    toast.error("Invalid email or password!");
                }
            } catch (error) {
                toast.error("Invalid email or password!");
                console.error(error);
            }
        } else {
            toast.error("Please fill all fields!");
        }
    };

    return (
        <div className="login-bg">
            <ToastContainer />
            <div className="main-container">
                <div className="container">
                    <div className="header-nav">
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        {action === "Login" ? null : (
                            <div className="input">
                                <img src={user_icon} alt="" />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                        )}
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="submit-container">
                        {action === "Sign Up" ? (
                            <div className="submit" onClick={handleSignUp}>
                                Sign Up
                            </div>
                        ) : (
                            <div className="submit" onClick={handleLogin}>
                                Login
                            </div>
                        )}
                        <div
                            className="toggle"
                            onClick={() => handleToggleAction(action === "Sign Up" ? "Login" : "Sign Up")}
                        >
                            <span>
                                {action === "Sign Up" ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
