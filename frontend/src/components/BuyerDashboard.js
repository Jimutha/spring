import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";

function BuyerDashboard({ userId }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/buyer/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleReaction = async (productId, type) => {
    await axios.post(
      `http://localhost:8080/api/buyer/products/${productId}/reactions`,
      { type, user: { id: userId } }
    );
  };

  const handleComment = async (productId) => {
    await axios.post(
      `http://localhost:8080/api/buyer/products/${productId}/comments`,
      { text: comment, user: { id: userId } }
    );
    setComment("");
  };

  const handleShare = async (productId) => {
    await axios.post(
      `http://localhost:8080/api/buyer/products/${productId}/share`
    );
  };

  const handleRequestRecipe = (productId) => {
    setSelectedProduct(productId);
  };

  const handleBuy = async () => {
    await axios.post("http://localhost:8080/api/buyer/payment", paymentDetails);
    setPaymentDetails("");
  };

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleReaction(product.id, "LIKE")}>
            Like
          </button>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
          />
          <button onClick={() => handleComment(product.id)}>Comment</button>
          <button onClick={() => handleShare(product.id)}>Share</button>
          <br />
          <button onClick={() => handleRequestRecipe(product.id)}>
            Request Recipe
          </button>
          <input
            type="text"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            placeholder="Payment Details"
          />
          <button onClick={handleBuy}>Buy Item</button>
        </div>
      ))}
      {selectedProduct && <Chat productId={selectedProduct} userId={userId} />}
    </div>
  );
}

export default BuyerDashboard;
