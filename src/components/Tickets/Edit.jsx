import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { encryptData } from "../Encrypt";

const Edit = () => {
  const [edit, setEdit] = useState({
    companyName: "",
    email: "",
    title: "",
    status: "resolve",
  });

  const { ticketId } = useParams();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYsInJvbGUiOjIsImlhdCI6MTc0ODk0NzczNiwiZXhwIjoxNzQ5NjY3NzM2fQ.Xu8YbdEh8L-ibHS5F8YDsJtiH0Azjc5y0dd3ZnhItG4";

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://195.35.8.196:6111/tickets/details?ticketId=${ticketId}`)
      .then((res) => {
        const data = res.data.ud;
        setEdit({
          companyName: data.userDetails.companyName || "",
          email: data.userDetails.email || "",
          title: data.title || "",
          status: "resolve",
        });
      })
      .catch((err) => {
        console.log("Error fetching ticket details:", err);
      });
  }, [ticketId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encryptedPayload = encryptData(edit);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        "http://195.35.8.196:6111/tickets/statusChange",
        { data: encryptedPayload }
      );

      console.log("Server response:", res.data);
      // navigate("/tickets"); // Uncomment if using navigation
    } catch (err) {
      console.error("Error sending encrypted payload:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Edit Details</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <input
          type="text"
          name="companyName"
          value={edit.companyName}
          onChange={handleInputChange}
          placeholder="Company Name"
        />
        <input
          type="email"
          name="email"
          value={edit.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="title"
          value={edit.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => console.log("Cancel")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Edit;
