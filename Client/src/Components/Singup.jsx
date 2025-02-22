import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { setAuthToken } from "../redux/slice/authSlice"; 
import docimg from "../Assets/docimg.png";
import Login from "./Login";

const Signup = () => {
  const signup_url = "http://localhost:3000/api/user/signup";

  const [loginState, setLoginState] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
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
      const response = await fetch(signup_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const responseData = await response.json();
      const authToken = responseData.authToken;

      localStorage.setItem("auth-token", JSON.stringify(authToken));

      dispatch(setAuthToken(authToken));

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }

  };


  return (
    <div className="text-white">
      <div className="w-[95%] flex justify-end flex-row">
        <img src={docimg} className="w-1/2 object-contain rounded-2xl" alt="Doctor"></img>
        {!loginState ? (
          <form
            onSubmit={handleSubmit}
            className="w-[40%] mx-10 py-10 px-20 flex flex-col gap-5 bg-gray-950 backdrop-blur-2xl shadow-2xl shadow-gray-900 rounded-2xl">
            <p className="font-bold text-gray-500">START FOR FREE</p>
            <h2 className="text-5xl">
              Create an Account<strong className=" text-emerald-500">.</strong>
            </h2>
            <p className="text-gray-400">
              Already have an Account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setLoginState(true)}>
                Log In
              </span>
            </p>
            <div className="mt-5 flex flex-col space-y-4 ">
              <div className="bg-gray-900 rounded-2xl px-3 py-2">
                <label htmlFor="name" className="text-sm">
                  Enter Your Name:
                </label>
                <br />
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  className="text-xl"
                  type="text"
                  placeholder="Jhon Doe"></input>
              </div>
              <div className="bg-gray-900 rounded-2xl px-3 py-2">
                <label htmlFor="username" className="text-sm">
                  Choose a Username:
                </label>
                <br />
                <input
                  required
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  id="username"
                  className="text-xl"
                  type="text"
                  placeholder="StarLord007"></input>
              </div>
              <div className="bg-gray-900  rounded-2xl px-3 py-2">
                <label htmlFor="email" className="text-sm">
                  Enter Your Email:
                </label>
                <br />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  className="text-xl"
                  type="text"
                  placeholder="Jhon.Doe@Example.com"></input>
              </div>
              <div className="bg-gray-900  rounded-2xl px-3 py-2">
                <label htmlFor="password" className="text-sm">
                  Enter a password:
                </label>
                <br />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  className="text-xl"
                  type="password"
                  placeholder="Password"></input>
              </div>
              <button className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 duration-150">
                Signup
              </button>
            </div>
          </form>
        ) : (
          <Login setLogin={setLoginState} />
        )}
      </div>
    </div>
  );
};

export default Signup;
