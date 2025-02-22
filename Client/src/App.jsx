import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
import Signup from "./Components/Singup";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";


function App() {


  return (
    <>
      <ToastContainer

      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
