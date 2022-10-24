import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import "./index.css";

var response = null;

function App() {

  const [userSearch, setUserSearch] = useState("");
  const url = "http://localhost:5000/";

  async function search(event) {

    event.preventDefault();

    axios.defaults.withCredentials = true;
    response = await axios.post(url + "Course/CourseSearch", {user: userSearch})
                .then(res => {return res.data});
    
    console.log(response.searchResults);
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={search}>
        <input type="text" placeholder="Search for course" name='user' value={userSearch} onChange={(e) => {setUserSearch(e.target.value)}} />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default App;
