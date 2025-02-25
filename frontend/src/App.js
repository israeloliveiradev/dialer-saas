import React, { useState, useEffect } from 'react';

function App() {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => setMessage('Error: ' + error));
    }, []);

    return (
        <div>
            <h1>Frontend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;