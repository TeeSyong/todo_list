// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Activity from './Activity'; // Updated import

function App() {
  const [activity, setActivity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [booking, setBooking] = useState(false);
  const [accessibility, setAccessibility] = useState(50);
  const [todos, settodos] = useState([]); // Keeping 'todos' for now, see note below

  useEffect(() => {
    const storedtodos = localStorage.getItem('todos');
    if (storedtodos) {
      const parsedtodos = JSON.parse(storedtodos);
      settodos(parsedtodos.map(user => Activity.fromJSON(user))); // Updated to Activity
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activity || !price || !type) return;

    const newActivity = new Activity(activity, parseInt(price), type, booking, accessibility); // Updated to Activity
    const updatedtodos = [...todos, newActivity];
    settodos(updatedtodos);
    localStorage.setItem('todos', JSON.stringify(updatedtodos));

    setActivity('');
    setPrice('');
    setType('');
    setBooking(false);
    setAccessibility(50);
  };

  const handleDelete = (index) => {
    const updatedtodos = todos.filter((_, i) => i !== index);
    settodos(updatedtodos);
    localStorage.setItem('todos', JSON.stringify(updatedtodos));
  };

  return (
    <div className="container">
      <h1>ToDo List ({todos.length})</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Activity:
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Enter activity"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Type:
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="education">Study</option>
              <option value="recreational">Recreational</option>
              <option value="social">social</option>
              <option value="diy">diy</option>
              <option value="charity">charity</option>
              <option value="cooking">cooking</option>
              <option value="relaxation">relaxation</option>
              <option value="music">music</option>
              <option value="busywork">busywork</option>

            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Booking:
            <input
              type="checkbox"
              checked={booking}
              onChange={(e) => setBooking(e.target.checked)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Accessibility (0-100):
            <input
              type="range"
              min="0"
              max="100"
              value={accessibility}
              onChange={(e) => setAccessibility(parseInt(e.target.value))}
            />
            <span>{accessibility}</span>
          </label>
        </div>
        <button type="submit">Add To Dos</button>
      </form>

      {todos.length === 0 ? (
        <p className="no-todos">No to dos added yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Price</th>
                <th>Type</th>
                <th>Booking</th>
                <th>Accessibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((user, index) => (
                <tr key={index}>
                  <td>{user.activity}</td>
                  <td>{user.price}</td>
                  <td>{user.type}</td>
                  <td>{user.booking ? 'Yes' : 'No'}</td>
                  <td>{user.accessibility}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;