import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../styles/App.css';

const KeyValueStore = () => {
    const location = useLocation();
    const history = useHistory();
    const [keyValues, setKeyValues] = useState({});

    // Parse the key-value pairs from the URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newKeyValues = {};
        params.forEach((value, key) => {
            newKeyValues[key] = value;
        });
        setKeyValues(newKeyValues);
    }, [location.search]);

    // Function to update a key-value pair in the state
    const updateKeyValue = (key, value) => {
        setKeyValues((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    // Handle updating the URL when the Update Values button is clicked
    const handleUpdateClick = () => {
        const params = new URLSearchParams();
        Object.keys(keyValues).forEach((key) => {
            params.append(key, keyValues[key]);
        });
        history.push(`?${params.toString()}`);
    };

    // Handle deleting a key-value pair from the state
    const handleDeleteClick = (key) => {
        const newKeyValues = { ...keyValues };
        delete newKeyValues[key];
        setKeyValues(newKeyValues);

        // Update URL
        const params = new URLSearchParams();
        Object.keys(newKeyValues).forEach((k) => {
            params.append(k, newKeyValues[k]);
        });
        history.push(`?${params.toString()}`);
    };

    // Render the key-value pairs
    return (
        <div>
            <h1>Key Value Store</h1>
            <div>
                {Object.keys(keyValues).length > 0 ? (
                    Object.keys(keyValues).map((key) => (
                        <div key={key} className='key-value-div'>
                            <span className='key-field'>{key}:</span>
                            <input
                                className='value-field'
                                type="text"
                                value={keyValues[key]}
                                onChange={(e) => updateKeyValue(key, e.target.value)}
                            />
                            <button className='delete-btn' onClick={() => handleDeleteClick(key)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No key values found in URL.</p>
                )}
                <button className='update-btn' onClick={handleUpdateClick}>Update Values</button>
            </div>
        </div>
    );
}

export default KeyValueStore;
