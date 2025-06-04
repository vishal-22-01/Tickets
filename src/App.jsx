import React from "react";
import Tickets from "./components/Tickets/Tickets";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./components/Tickets/Add";
import View from "./components/Tickets/View";
import Edit from "./components/Tickets/Edit";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Tickets />} />
        <Route path="/tickets/add" element={<Add />} />
        <Route path="/tickets/details/:ticketId" element={<View />} />
        <Route path="/tickets/edit/:ticketId" element={<Edit />} />
      </Routes>
    </>
  );
};

export default App;
