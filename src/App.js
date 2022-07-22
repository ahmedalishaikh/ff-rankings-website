import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Home />
    </DndProvider>
  );
}

export default App;
