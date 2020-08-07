import React, { useEffect } from 'react';
import './App.css';
import AppBackend from "./backend/AppBackend";

function App() {

  useEffect(() => {
    AppBackend.testServeur();
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Delphine Bugner
        </p>
      </header>
      <div className="App-body">
      </div>
    </div>
  );
}

export default App;
