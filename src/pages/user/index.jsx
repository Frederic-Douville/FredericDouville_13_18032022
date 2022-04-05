import { useEffect, useState } from 'react';
import { useStore, useSelector } from 'react-redux';
import { userToken, userData } from '../../utils/selectors';
import { getUserData } from '../../features/user';
import './user.css';

function User() {
    const [isOpen, setIsOpen] = useState(false);
    const editNameIsOpen = () => setIsOpen(!isOpen);

    const store = useStore();
    const token = useSelector(userToken).response?.data;
    const user = useSelector(userData);

    useEffect(() => {
        getUserData(store, token);
    }, [store, token]);

    function submitNewNames(event) {
        event.preventDefault();
        const names = {
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
        };
        console.log(names);
        document.getElementById('form-change-name').reset();
        editNameIsOpen();
    }

    return (
        <main className={`main ${isOpen ? 'bg-light' : 'bg-dark'}`}>
            {!isOpen ? (
                <div className="header">
                    <h1>
                        Welcome back
                        <br />
                        {user.response?.data.firstName}{' '}
                        {user.response?.data.lastName}
                    </h1>
                    <button className="edit-button" onClick={editNameIsOpen}>
                        Edit Name
                    </button>
                </div>
            ) : (
                <div className="header-light">
                    <h1>Welcome back</h1>
                    <form className="edit-name-form-ctn" id="form-change-name">
                        <div className="edit-name-input-ctn">
                            <label for="firstname"></label>
                            <input
                                type="text"
                                id="firstname"
                                placeholder={user.response?.data.firstName}
                            />
                            <label for="lastname"></label>
                            <input
                                type="text"
                                id="lastname"
                                placeholder={user.response?.data.lastName}
                            />
                        </div>
                        <div className="edit-name-button-ctn">
                            <button
                                className="edit-name-button save-button"
                                onClick={submitNewNames}
                            >
                                Save
                            </button>
                            <button
                                className="edit-name-button cancel-button"
                                onClick={editNameIsOpen}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <h2 className="sr-only">Accounts</h2>
            <section className={`account ${isOpen ? 'account-light' : ''}`}>
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Checking (x8349)
                    </h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button
                        className={`transaction-button ${
                            isOpen ? 'transaction-button-light' : ''
                        }`}
                    >
                        View transactions
                    </button>
                </div>
            </section>
            <section className={`account ${isOpen ? 'account-light' : ''}`}>
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Savings (x6712)
                    </h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button
                        className={`transaction-button ${
                            isOpen ? 'transaction-button-light' : ''
                        }`}
                    >
                        View transactions
                    </button>
                </div>
            </section>
            <section className={`account ${isOpen ? 'account-light' : ''}`}>
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">
                        Current Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button
                        className={`transaction-button ${
                            isOpen ? 'transaction-button-light' : ''
                        }`}
                    >
                        View transactions
                    </button>
                </div>
            </section>
        </main>
    );
}

export default User;
