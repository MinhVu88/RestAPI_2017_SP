import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`/api/users/geo?long=${longitude}&lat=${latitude}`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));

    setLongitude("");
    setLatitude("");
  };

  console.log(latitude, longitude, users);

  return (
    <div id="home">
      <div id="container">
        <form id="search" onSubmit={handleSubmit}>
          <label>Enter your Latitude:</label>
          <input
            type="text"
            placeholder="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required
          />
          <label>Enter your Longitude:</label>
          <input
            type="text"
            placeholder="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required
          />
          <input type="submit" value="Find Users" />
        </form>
        <ul>
          {users.length > 0 &&
            users.map((user, index) => (
              <li key={index}>
                <span className={user.available}></span>
                <span className="name">{user.name}</span>
                <span className="age">{user.age}</span>
                <span className="dist">
                  {Math.floor(user.dist.calculated / 1000)} km
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
