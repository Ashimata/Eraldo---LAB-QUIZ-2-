import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3000/api/voters1',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await axios.post('http://localhost:3000/api/voters1', formData);
    console.log(result.data);
  };

  return (
    <>
      <div className="App">
        <h2> Voter's Registration </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group3">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="province">Province:</label>
            <input type="text" id="province" name="province" required />

            <label htmlFor="city">City/Municipality:</label>
            <input type="text" id="city" name="city" required />

            <label htmlFor="barangay">Barangay:</label>
            <input type="text" id="barangay" name="barangay" required />
          </div>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />

          <label htmlFor="age">Age:</label>
          <input type="text" id="age" name="age" required />

          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </form>
        {data && <div>{data.message}</div>}
      </div>

    </>
  );
}

export default App;
