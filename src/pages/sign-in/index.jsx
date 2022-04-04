import './sign-in.css';
import { useStore } from 'react-redux';
import { userToken } from '../../utils/selectors';
import { getToken } from '../../features/token';

function SignIn() {
    const store = useStore();
    const response = userToken(store.getState()).response;

    console.log(response);

    function GetUserProfile(event) {
        event.preventDefault();
        const log = {
            email: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };
        console.log(log);
        getToken(store, log);
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
