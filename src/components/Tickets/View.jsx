import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const View = () => {
  const [view, setView] = useState([]);
  const { ticketId } = useParams();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYsInJvbGUiOjIsImlhdCI6MTc0ODk0NzczNiwiZXhwIjoxNzQ5NjY3NzM2fQ.Xu8YbdEh8L-ibHS5F8YDsJtiH0Azjc5y0dd3ZnhItG4";

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://195.35.8.196:6111/tickets/details?ticketId=${ticketId}`)
      .then((res) => {
        setView([res.data.ud]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [ticketId]);

  if (!view || view.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h2>Ticket Detail</h2>
      {view.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <p>
            <strong>Company Name:</strong>{" "}
            {item.userDetails?.companyName || "N/A"}
          </p>
          <p>
            <strong>Title:</strong> {item.title}
          </p>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(item.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>User Email:</strong> {item.userDetails?.email || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default View;
