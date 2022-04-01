import './sign-in.css';
import { useStore, useSelector } from 'react-redux';
import { userData, userToken } from '../../utils/selectors';
import { getOrUpdateToken } from '../../features/token';
import { getUserData } from '../../features/user';

function SignIn() {
    const store = useStore();

    const token = useSelector(userToken);
    const user = useSelector(userData);

    console.log(token.data);
    console.log(user.data.firstName, user.data.lastName);

    const userName = document.getElementById('username');
    const passWord = document.getElementById('password');
    const formSignIn = document.getElementById('form-sign-in');

    function GetUserSignIn(event) {
        event.preventDefault();
        const data = {
            email: userName?.value,
            password: passWord?.value,
        };
        getOrUpdateToken(store, data);
        if (token) {
            getUserData(store, token.data);
            formSignIn?.reset();
        }
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

                    <button className="sign-in-button" onClick={GetUserSignIn}>
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
