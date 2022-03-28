import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Header, Error } from './components';
import { Home, SignIn, User } from './pages';
import './index.css';
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/user" element={<User />} />
                <Route path="*" element={<Error />} />
            </Routes>

            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
