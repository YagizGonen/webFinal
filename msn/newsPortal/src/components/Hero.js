import React from "react";

import logo from "../assets/msn.jpg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">News Portal</h1>

    <p className="lead">Browse news across the globe in different categories</p>
  </div>
);

export default Hero;
