import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat({ productId, userId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/buyer/products/${productId}/chat`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error(error));
  }, [productId]);

  const handleSend = async () => {
    await axios.post("http://localhost:8080/api/seller/messages", {
      text: message,
      sender: { id: userId },
      receiver: { id: 2 }, // Simulate seller ID
      productId,
    });
    setMessage("");
    // Refresh messages
    const response = await axios.get(
      `http://localhost:8080/api/buyer/products/${productId}/chat`
    );
    setMessages(response.data);
  };

  return (
    <div>
      <h2>Chat for Product {productId}</h2>
      {messages.map((msg) => (
        <p key={msg.id}>{msg.text}</p>
      ))}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
