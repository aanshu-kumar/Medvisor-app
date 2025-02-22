import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
import Signup from "./Components/Singup";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, logout } from "./redux/slice/authSlice";

function App() {
  const authToken = useSelector((state) => state.auth.authToken); 
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      dispatch(setAuthToken(token)); // Ensure Redux state is in sync on mount
    }
  }, [dispatch]);

  function logoutHandler() {
    console.log("handled logout");
    dispatch(logout()); // Dispatch logout action
    toast.success("Logout successful!");
  }

  function getStarted() {
    navigate("/signup");
  }

  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose="1500"
      />
      <nav className="z-40 w-full sticky top-0 text-white flex flex-row items-center justify-between py-2 mx-auto ">
        <h1 className="text-2xl text-emerald-600 font-bold">Medvisor</h1>
        <div className="flex flex-row items-center gap-5">
          <p>{authToken ? "Welcome" : "Try Medvisor?"}</p>
          <button
            onClick={authToken ? logoutHandler : getStarted}
            className="cursor-pointer border-2 border-b-blue-400 py-1 px-3 rounded-2xl text-blue-400"
          >
            {authToken ? "Logout" : "Get Started"}
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
