import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import MyAccount from "./myaccount";
import Booking from "./booking";
import Cars from "./cars";
import Login from "./login";
export const Context = createContext();

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<MyAccount/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="*" exact element={<Login />} />
      </Routes>
    </>
  );
}

export default App;