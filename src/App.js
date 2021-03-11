import React from "react";
import "./App.css";
import PrimarySearchAppBar from "./NavBar";
import MediaCard from "./Cards";
import JSONDATA from "./MOCK-JSON-DATA.json";
import Cart from "./Cart";
import history from "./history";
import { Router, Switch, Route, Link } from "react-router-dom";

function App() {
  console.log(JSONDATA);
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/">
          <MediaCard />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Router>
    </div>
  );
}

export default App;
