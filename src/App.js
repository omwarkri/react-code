import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🚀 Welcome to  Om First React Application!</h1>
        <h1>Auto deployed via Jenkins + K8s with help by Om 🚀</h1>

        <p className="app-subtitle">
          Build amazing web apps with <span>React.js</span>
        </p>
        <button
          className="app-button"
          onClick={() => alert("Let's start coding! 💻")}
        >
          Get Started
        </button>
      </header>
    </div>
  );
}

export default App;
