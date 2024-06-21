import React from "react";
import "./Home.css";
import image1 from "./car.jpg";
import image2 from "./house.jpg";
import image3 from "./materials.jpg";
import image4 from "./Ald.jpg";
import image5 from "./sdg.png";
import userIcon from "./person.png";

import { Link } from "react-router-dom";

const Home = () => {
    const isLoggedIn = !!localStorage.getItem("userEmail");

    return (
        <div className="home-container">
            <div className="background-image"></div>
            <nav className="navbar">
                <div className="logo-container">
                    <a href="/sdg" target="_blank">
                        <img src={image5} alt="" className="logo" />
                    </a>
                </div>

                <div className="button-container">
                    {!isLoggedIn && (
                        <Link to="/register" className="link">
                            <button className="login-btn">Login</button>
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <button className="sdg-info-btn">
                            <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.epa.gov/climate-change" target="_blank">
                                Discover More about Climate Change?
                            </a>
                        </button>
                    )}

                    {isLoggedIn && (
                        <Link to="/conway" className="link">
                            <button className="conway-btn">Conway's Game of Life Predictions</button>
                        </Link>
                    )}
                    {isLoggedIn && (
                        <Link to="/schseg" className="link">
                            <button className="sdg-info-btn">Segregation Dynamics</button>
                        </Link>
                    )}
                     {isLoggedIn && (
                        <Link to="/profile" className="link">
                            <button className="conway-btn">Profile</button>
                        </Link>
                    )}

                   
                </div>
            </nav>

            <header>
                <h1 style={{ fontWeight: "bolder" }}>THE FUTURE OF <br /> CLIMATE IS HERE</h1>
            </header>
            <div className="content">
                <div className="white-container">
                    <h2>Discover how you're making a difference with our Carbon Savings Tracker!</h2>
                </div>
            </div>
            <div className="boxes-container">
                <div className="box">
                    <img src={image1} alt="Image 1" />
                    <Link to="/travel" style={{ color: "black", textDecoration: "none" }}>
                        <h3>Travel</h3>
                    </Link>
                </div>
                <div className="box">
                    <img src={image2} alt="Image 2" />
                    <Link to="/home-appliances" style={{ color: "black", textDecoration: "none" }}>
                        <h3>Home-Appliances</h3>
                    </Link>
                </div>
                <div className="box">
                    <img src={image3} alt="Image 3" />
                    <Link to="/material" style={{ color: "black", textDecoration: "none" }}>
                        <h3>Material</h3>
                    </Link>
                </div>
                <div className="box">
                    <img src={image4} alt="Image 4" />
                    <Link to="/aid" style={{ color: "black", textDecoration: "none" }}>
                        <h3>Aid</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
