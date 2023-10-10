import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatePackage from "./components/create-package.component";
import EditPackage from "./components/edit-packge.component";
import PackagesList from "./components/package-list.component";

import logo from "./logo.png";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
            <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
          </a>
          <Link to="/" className="navbar-brand">MERN-Stack Package App</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Packages</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Package</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Routes>
          <Route path="/" exact Component={PackagesList} />
          <Route path="/edit/:id" element={<EditPackage/>} />
          <Route path="/create" Component={CreatePackage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
