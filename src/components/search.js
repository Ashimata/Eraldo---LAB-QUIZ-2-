import React, { useState } from 'react';
import './search.css';
import axios from 'axios';

function Search() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

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
    }
  };

  return (
    <>
      <h2>Search Voter's Data</h2>

      <form onSubmit={handleSubmit}>
        <div class="input-group">
            <input type="text" name="search" placeholder="Search" value={search} onChange={handleChange} required />
            <button type="submit">Search</button>
        </div>
      </form>

      {data.length > 0 && (
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Province</th>
            <th>City/Municipality</th>
            <th>Barangay</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
              <td>{row[5]}</td>
              <td>{row[6]}</td>
              <td>{row[7]}</td>
            </tr>
          ))}
        </table>
      )}
    </>
  );
}

export default Search;
