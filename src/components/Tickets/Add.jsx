import axios from 'axios';
import React, { useState } from 'react'

const Add = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    email: "",
    companyName: "",
    fullName: "",
    firstName: "",
    comment: ""
  })

  const handleSubmit = (async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://195.35.8.196:6111/tickets/add", formData)
      console.log(res.data, "Response");


    } catch (err) {
      console.log("Error", err

      );

    }
  })

  const handleChange = ((e)=>{
setFormData({...formData, [e.target.name]: e.target.value})
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name
          </label>
          <input type='text' name='firstName' onChange={handleChange} />
        </div>
        <div>
          <label>
            Full Name
          </label>
          <input type='text' name='fullName' onChange={handleChange} />
        </div>
        <div>
          <label>
            Company Name
          </label>
          <input type='text' name='companyName' onChange={handleChange} />
        </div>
        <div>
          <label>
            Email
          </label>
          <input type='text' name='email' onChange={handleChange} />
          </div>
        <div>
          <label>
            Title
          </label>
          <input type='text' name='title'  onChange={handleChange}/>
          </div>
        <div>
          <label>
            Description
          </label>
          <input type='text' name='description' onChange={handleChange} />
        </div>
        <div>
          <label>
            Comment
          </label>
          <input type='text' name='comment' onChange={handleChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Add