import React from "react";
import "./styles.css";

import Parallax from "./Parallax.js";

export default function App() {
  return (
    <div className="App">
      <Parallax>
        <div style={{ background: "red", width: "50px", height: "50px" }} />
        <div style={{ background: "blue", width: "50px", height: "50px" }} />
        <div style={{ background: "green", width: "50px", height: "50px" }} />
      </Parallax>
    </div>
  );
}
