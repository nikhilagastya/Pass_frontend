import React, { useState } from "react";
import Verify from "./screens/Verify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generate from "./Components/Generate";
import Events from "./screens/Events";
import Payment from "./screens/Payment";
import Success from "./screens/Success";
import Home from "./screens/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Verify />}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/events" element={<Events />}/>
        <Route  exact path="/generate" element={<Generate/>} />
        <Route  exact path="/payment" element={<Payment/>} />
        <Route  exact path="/success" element={<Success/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
