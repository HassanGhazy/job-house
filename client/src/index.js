import React from 'react';
import ReactDOM from 'react-dom';
import Contact from "./pages/contact";
import Home from "./pages/home";
import About from "./pages/about";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Register from "./pages/register";
import Browse from "./pages/browse";
// import useFetch from "./helpers/useFetch";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Index = () =>  <>
     <header id="header">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                  <div className="container-fluid">
                     <a className="navbar-brand" href="/">Job Ring</a> 
                     
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarCollapse">
                          <ul className="navbar-nav me-auto mb-2 mb-md-0">
                              <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="/about">About Us</a>
                              </li>
                              <li className="nav-item">
                                    <a className="nav-link" href="/contact">Contact Us</a>
                                
                              </li>
                          </ul>
                          <form  style= {{  float: "right", paddingTop:"5px"}} className="form-inline mt-2 mt-md-0">

                              <input style= {{  float: "left", width: "400px !important", paddingTop:"5px"}} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                              <button className="btn btn-outline-success my-2 my-sm-0" style= {{ margin: 10}} type="submit">Search</button>
                          </form>
                      </div>
                  </div>
        </nav>
    </header>
    

    <Router>
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/terms">
            <Terms />
        </Route>
        <Route path="/privacy">
            <Privacy />
        </Route>
        <Route path="/contact">
            <Contact />
        </Route>
        <Route path="/about">
            <About />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
        <Route path="/browse">
            <Browse />
        </Route>
    </Switch>
    </Router>

    <footer style={{clear: "both",position: "relative"}}>
        <hr/>
        <p style={{float: "right", marginRight: "1%"}} className="float-end"><a href="#header">Back to top ☝</a></p>
        <p style={{textAlign: "center"}}>&copy; Job Ring. 2020 &middot; 
        
        <a href="/privacy">Privacy</a>
         <a href="/terms">Terms</a>
         <a href="/contact">Contact Us</a>
        
        </p>
    </footer>
    </>;

ReactDOM.render(<Index />, document.getElementById('root')
);
