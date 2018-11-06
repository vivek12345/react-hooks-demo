import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Users from "./Users";

import "./styles.css";

function App() {
  const [counter, updateCounter] = useState(0);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={() => updateCounter(prevState => prevState + 1)}>
        +
      </button>
      <h2>Start editing to see some magic happen!</h2>
      {counter <= 5 ? (
        <Users counter={counter} />
      ) : (
        <div>Unmounted Users component</div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
