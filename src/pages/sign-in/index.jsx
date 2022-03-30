import './sign-in.css';
import {
    useCallAPIToken,
    useCallAPIProfile,
    useCallAPIChangeProfile,
} from '../../utils/hooks/useCallAPI';

function SignIn() {
    const userName = document.getElementById('username');
    const passWord = document.getElementById('password');
    var data = {};

    function GetUserSignIn(event) {
        event.preventDefault();
        data = {
            email: userName.value,
            password: passWord.value,
        };
        console.log(data);

        return data;
    }

    //const { token } = useCallAPIToken(data);

    //const { datas } = useCallAPIProfile(token);

    //useCallAPIChangeProfile(token);

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
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
