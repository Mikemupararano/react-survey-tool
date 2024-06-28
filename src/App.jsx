import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SurveyForm from "./components/SurveyForm";
import reactLogo from "./assets/group8-logo.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>Digital Brand Survey Tool</h1>
      </header>
      <main>
        <SurveyForm />
      </main>
    </div>
  );
}

export default App;

