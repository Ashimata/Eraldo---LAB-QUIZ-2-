import React, { useState, useEffect } from 'react';
import './update.css';
import axios from 'axios';

function Update({ id, onClose, onUpdate }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/voters1/update/${id}`);
      setData(result.data);
    };

    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:3000/api/voters1/update/${id}`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(result.data);
      onUpdate();
      setData(null);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Update Voter's Data</h2>

      {data && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={data.name ?? ''} onChange={handleChange} required />

          <label htmlFor="province">Province:</label>
          <input type="text" id="province" name="province" value={data.province ?? ''} onChange={handleChange} required />

          <label htmlFor="city">City/Municipality:</label>
          <input type="text" id="city" name="city" value={data.city ?? ''} onChange={handleChange} required />

          <label htmlFor="barangay">Barangay:</label>
          <input type="text" id="barangay" name="barangay" value={data.barangay ?? ''} onChange={handleChange} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={data.email ?? ''} onChange={handleChange} required />

          <label htmlFor="age">Age:</label>
          <input type="text" id="age" name="age" value={data.age ?? ''} onChange={handleChange} required />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={data.address ?? ''} onChange={handleChange} required />

          <button type="submit">Update</button>
        </form>
      )}
    </>
  );
}
export default Update;
