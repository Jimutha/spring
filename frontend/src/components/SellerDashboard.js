import React, { useState } from "react";
import axios from "axios";

function SellerDashboard({ userId }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [reply, setReply] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/seller/products", {
      ...product,
      seller: { id: userId },
    });
    setProduct({ name: "", description: "", price: "" });
  };

  const handleReply = async (commentId) => {
    await axios.post(
      `http://localhost:8080/api/seller/comments/${commentId}/reply`,
      reply
    );
    setReply("");
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Cake Name"
        />
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Description"
        ></textarea>
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Price"
        />
        <button type="submit">Add Product</button>
      </form>
      <h2>Reply to Comment</h2>
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Reply"
      />
      <button onClick={() => handleReply(1)}>Reply (Comment ID 1)</button>{" "}
      {/* Simulate comment ID */}
    </div>
  );
}

export default SellerDashboard;
