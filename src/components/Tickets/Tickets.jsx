import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Tickets = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYsInJvbGUiOjIsImlhdCI6MTc0ODk0NzczNiwiZXhwIjoxNzQ5NjY3NzM2fQ.Xu8YbdEh8L-ibHS5F8YDsJtiH0Azjc5y0dd3ZnhItG4";

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("http://195.35.8.196:6111/tickets/listing")
      .then((res) => {
        setData(res.data.ud);
        console.log(res.data.ud);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <>
      <div className="add">
        <button>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            {/* <th>Comment</th> */}
            <th>Status</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele, index) => (
            <tr key={index}>
              <td>{ele?.userDetails?.companyName}</td>
              <td>{ele?.userDetails?.email}</td>
              {/* <td>{ele?.comment}</td> */}
              <td>{ele?.status}</td>
              <td>{ele?.title}</td>
              <td>
                <div className="action">
                  <button>
                    <FaEye />
                  </button>
                  <button>
                    <FaEdit />
                  </button>
                  <button>
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tickets;
