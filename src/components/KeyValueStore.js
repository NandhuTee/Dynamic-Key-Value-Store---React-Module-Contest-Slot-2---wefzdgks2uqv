import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../styles/App.css';

const KeyValueStore = () => {
    const location = useLocation();
    const history = useHistory();
    const [keyValues, setKeyValues] = useState({});

    // Parse the key-value pairs from the URL and update the state
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

        // Update the URL with the new key-value pairs
        const params = new URLSearchParams();
        Object.keys(keyValues).forEach((k) => {
            params.append(k, keyValues[k]);
        });
        history.push(`?${params.toString()}`);
    };

    // Function to handle deleting a key-value pair from the state
    const handleDeleteClick = (key) => {
        const newKeyValues = { ...keyValues };
        delete newKeyValues[key];
        setKeyValues(newKeyValues);

        // Update the URL to remove the deleted key-value pair
        const params = new URLSearchParams();
        Object.keys(newKeyValues).forEach((k) => {
            params.append(k, newKeyValues[k]);
        });
        history.push(`?${params.toString()}`);
    };

    // Function to handle updating the URL when the "Update Values" button is clicked
    const handleUpdateClick = () => {
        const params = new URLSearchParams();
        Object.keys(keyValues).forEach((key) => {
            params.append(key, keyValues[key]);
        });
        history.push(`?${params.toString()}`);
    };

    // Render the key-value pairs or a message if none are found
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
                                type='text'
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
