import axios from "axios";
import React, { useState, useEffect } from "react";
import { encryptData } from "../Encrypt"; // Adjust if needed
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: 76,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = Number(localStorage.getItem("userId")) || 76;
    setFormData((prev) => ({ ...prev, userId: storedUserId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encryptedPayload = encryptData(formData);

      const res = await axios.post("http://195.35.8.196:6111/tickets/add", {
        data: encryptedPayload,
      });

      console.log("Server response:", res.data);
      navigate("/");
    } catch (err) {
      console.error("Error sending encrypted payload:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          autoComplete="off"
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          autoComplete="off"
          onChange={handleChange}
        />
      </div>

      <div>
        <label>User ID</label>
        <input type="number" name="userId" value={formData.userId} readOnly />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Add;
