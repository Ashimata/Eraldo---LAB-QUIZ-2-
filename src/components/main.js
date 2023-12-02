import { useState, useEffect } from 'react';
import './main.css';
import axios from 'axios';



function Main() {
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

  return (
    <>
      <div className="App">
        <h2> Voter's Registration </h2>
        <form method="POST" action="http://localhost:3000/api/voters1">
          <div className="input-group1">
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

export default Main;
