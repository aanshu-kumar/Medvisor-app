import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/slice/authSlice"; // Ensure correct import path

// eslint-disable-next-line react/prop-types
const Login = ({ setLogin }) => {
  const signin_url = "http://localhost:3000/api/user/signin";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(signin_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Your credentials do not match.");
      }

      const responseData = await response.json();
      const authToken = responseData.authToken;

      // Save token in localStorage
      localStorage.setItem("auth-token", JSON.stringify(authToken));

      // Dispatch action to store token in Redux
      dispatch(setAuthToken(authToken));

      setFormData({
        email: "",
        password: "",
      });
      toast.success(responseData.msg);
      navigate("/chat"); // Redirect to homepage or protected route
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[40%] mx-10 py-10 px-20 flex gap-5 flex-col bg-gray-950 backdrop-blur-2xl shadow-2xl shadow-gray-900 rounded-2xl"
    >
      <p className="font-bold text-gray-500">WELCOME BACK</p>
      <h2 className="text-5xl">
        Login to Your Account<strong className="text-emerald-500">.</strong>
      </h2>
      <p className="text-gray-400">
        Don&apos;t have an Account?{" "}
        <span className="text-blue-400 cursor-pointer" onClick={() => setLogin(false)}>
          Sign up
        </span>
      </p>
      <div className="mt-5 flex flex-col space-y-4">
        <div className="bg-gray-900 rounded-2xl px-3 py-2">
          <label className="text-sm">Enter Your Email:</label>
          <br />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-xl w-full"
            type="email"
            required
            placeholder="Jhon.Doe@Example.com"
          />
        </div>
        <div className="bg-gray-900 rounded-2xl px-3 py-2">
          <label className="text-sm">Enter a password:</label>
          <br />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-xl w-full"
            type="password"
            required
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 duration-150"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
