import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>React Frontend</h1>
      <p>Message from Backend:</p>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
