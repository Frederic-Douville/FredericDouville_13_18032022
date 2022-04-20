import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Header, Error } from './components';
import { Home, SignIn, User } from './pages';
import { Provider } from 'react-redux';
import store from './utils/store';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/profile" element={<User />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
