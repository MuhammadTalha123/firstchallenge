import React from "react";
import "./App.css";
import PrimarySearchAppBar from "./NavBar";
import MediaCard from "./Cards";
import JSONDATA from "./MOCK-JSON-DATA.json";

function App() {
  console.log(JSONDATA);
  return (
    <div className="App">
      <MediaCard />
    </div>
  );
}

export default App;
