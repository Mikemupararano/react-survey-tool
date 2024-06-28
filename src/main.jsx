import React from "react";
import { createRoot } from "react-dom/client"; // Correct import statement for React 18
import App from "./App.jsx";
import "./index.css";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


