import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import KeyValueStore from './KeyValueStore';
import '../styles/App.css';

function App() {
    return (
        <Router>
            <div id="main">
                <nav>
                    <Link to="/">Reset</Link>
                </nav>
                <Route path="/" exact>
                    <KeyValueStore />
                </Route>
            </div>
        </Router>
    );
}

export default App;
