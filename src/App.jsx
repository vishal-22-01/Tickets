import React from "react";
import Tickets from "./components/Tickets/Tickets";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./components/Tickets/Add";

const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Tickets />}/>
            <Route path="/tickets/add" element={<Add />}/>
        </Routes>
    </>
  );
};

export default App;
