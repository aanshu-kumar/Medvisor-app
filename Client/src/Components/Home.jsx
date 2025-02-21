/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Chatlog from "./Chatlog";
import ChatlogAI from "./ChatlogAI";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Home = () => {
  const chat_bot_url = "http://localhost:3000/api/bot";
  // const completions_url = "http://localhost:3000/api/aibot/completions";
  // const get_chat_url = "http://localhost:3000/api/aibot/getchat"

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "Medvisor",
      message: "Hello, how can I help you!!",
    },
  ]);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  async function getChatData() {
    try {
      const authToken = localStorage.getItem("auth-token");
      const response = await fetch(`${chat_bot_url}/getchat`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const responseData = await response.json();

      responseData.data.map((chat) => {
        setChatLog((chatLog) => [
          ...chatLog,
          { user: chat.role, message: chat.content },
        ]);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getChatData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog((chatLog) => [...chatLog, { user: "You", message: `${input}` }]);
    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      toast.error(
        "You need to Login first!"
      );
      navigate("/signup");
    }

    try {
      const response = await fetch(`${chat_bot_url}/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(authToken),
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const responseData = await response.json();
      
      setChatLog((chatLog) => [
        ...chatLog,
        { user: "Medvisor", message: responseData.data },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="w-full h-[42rem] text-white flex justify-center relative">
      <div className="w-[100%] md:w-[55%] chatbox overflow-auto h-[80%] mt-[8px]">
        {chatLog.map((chat, index) =>
          chat.user == "Medvisor" ? (
            <ChatlogAI key={index} message={chat}></ChatlogAI>
          ) : (
            <Chatlog key={index} message={chat} />
          )
        )}
        <div ref={chatEndRef} />
      </div>
      {/* chat input holder */}
      <form
        onSubmit={handleSubmit}
        className="flex justify-center p-[12px] absolute inset-x-0 bottom-10 mb-[20px]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={"1"}
          className="w-[100%] md:w-[60%] bg-[#507554]  placeholder-[#F5EFE6] outline-none rounded-xl shadow-white shadow margin-[12px] px-[30px] py-[5px] pt-[7px] text-lg text-white border-[#dbdbda] border-spacing-10 border-4"
          placeholder="Enter your message here"
        ></input>
      </form>
      {/* warning message */}

      <div className="text-xs md:text-sm flex justify-center absolute inset-x-0 bottom-10">
        <p>
          Note: Medvisor can make mistakes. Consult doctors for critical
          information.
        </p>
      </div>
    </div>
  );
};
export default Home;
