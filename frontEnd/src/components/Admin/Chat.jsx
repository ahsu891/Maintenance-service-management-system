import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8800"); // Replace with your server URL

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [notifications, setNotifications] = useState([]);
  // useEffect(() => {
  //   console.log("Effect hook called");
  //   // Listen for incoming messages
  //   socket.on("chat message", (msg) => {
  //     console.log("Message received:", msg);
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   // Clean up function
  //   return () => {
  //     socket.off("chat message");
  //   };
  // }, []);
  useEffect(() => {
    socket?.emit("newUser", localStorage.getItem("user_id"));
  }, [socket]);
  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      id: new Date(),
      user_id: localStorage.getItem("user_id"),
      type: "Watre",
      title: "Hello ",
    });
  };
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    return () => {
      socket.off("getNotification");
    };
    //   };
  }, [socket]);
  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("chat message", input);
      setInput("");
    }
  };
  console.log(notifications);
  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleNotification}>Send</button>
    </div>
  );
}

export default Chat;
