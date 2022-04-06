import { Link } from 'react-router-dom';
import { useStore, useSelector } from 'react-redux';
import { userData, userHeader } from '../../utils/selectors';
import { headerUserIsNotLog } from '../../features/header';
import { tokenReset } from '../../features/token';
import { userReset } from '../../features/user';
import { namesReset } from '../../features/names';
import argentBankLogo from '../../assets/img/argentBankLogo.png';
import './header.css';

function Header() {
    const store = useStore();
    const userIsLog = useSelector(userHeader).status;
    const firstName = useSelector(userData).response?.data.firstName;

    function resetState() {
        if (userIsLog === true) {
            store.dispatch(headerUserIsNotLog());
            store.dispatch(tokenReset());
            store.dispatch(userReset());
            store.dispatch(namesReset());
        }
    }

    //store.dispatch(headerUserIsNotLog()
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {userIsLog === false ? (
                    <Link to="/sign-in" className="main-nav-item">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                ) : (
                    <div>
                        <Link to="/profile" className="main-nav-item">
                            <i className="fa fa-user-circle"></i> {firstName}
                        </Link>{' '}
                        <Link
                            to="/"
                            className="main-nav-item"
                            onClick={resetState}
                        >
                            <i className="fa fa-sign-out"></i> Sign Out
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;
