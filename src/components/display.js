import React, { useState, useEffect } from "react";
import "./display.css";
import axios from "axios";
import Update from "./update";

function Display() {
  const [data, setData] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/api/voters1/display");
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    setUpdateId(id);
  };

  const handleDelete = async (id, event) => {
    event.preventDefault();
    const result = await axios.get(`http://localhost:3000/api/voters1/delete/${id}`);
    console.log(result.data);
    setData(data.filter(row => row[0] !== id));
  };

  const handleUpdateClose = () => {
    setUpdateId(null);
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/api/voters1/display");
      setData(result.data);
    };
    fetchData();
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:3000/api/voters1/search`,
        { search },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(result.data);
      setData(result.data);
      setSearch('');
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the data.');
    }
  };

  return (
    <>
      <h2>Registration Voter's Data</h2>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="search" placeholder="Search" value={search} onChange={handleChange} required />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      <div className="table1">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Province</th>
              <th>City/Municipality</th>
              <th>Barangay</th>
              <th>Email</th>
              <th>Age</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>{row[5]}</td>
                  <td>{row[6]}</td>
                  <td>{row[7]}</td>
                  <td>
                    <button onClick={() => handleUpdate(row[0])}>Update</button>
                    <button onClick={(event) => handleDelete(row[0], event)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {updateId && (
        <Update id={updateId} onClose={handleUpdateClose} onUpdate={handleUpdateClose} />
      )}
    </>
  );
}

export default Display;
