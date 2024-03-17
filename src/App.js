import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:coinId" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
