import './sign-in.css';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userToken } from '../../utils/selectors';
import { getToken } from '../../features/token';
import { headerUserIsLog } from '../../features/header';

function SignIn() {
    const store = useStore();
    const navigate = useNavigate();

    function GetUserProfile(event) {
        event.preventDefault();
        const log = {
            email: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };
        getToken(store, log);
        window.setTimeout(() => {
            const status = userToken(store.getState()).status;
            if (status === 'resolved') {
                navigate('/profile');
                store.dispatch(headerUserIsLog());
            }
        }, 1000);
        document.getElementById('form-sign-in').reset();
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form id="form-sign-in">
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    <button className="sign-in-button" onClick={GetUserProfile}>
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
