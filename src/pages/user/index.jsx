import { useState } from 'react';
import './user.css';

function User() {
    const [isOpen, setIsOpen] = useState(false);
    const editNameIsOpen = () => setIsOpen(!isOpen);
    return (
        <main className={`main ${isOpen ? 'bg-light' : 'bg-dark'}`}>
            {!isOpen ? (
                <div className="header">
                    <h1>
                        Welcome back
                        <br />
                        Tony Jarvis!
                    </h1>
                    <button className="edit-button" onClick={editNameIsOpen}>
                        Edit Name
                    </button>
                </div>
            ) : (
                <div className="header-light">
                    <h1>Welcome back</h1>
                    <form className="edit-name-form-ctn">
                        <div className="edit-name-input-ctn">
                            <label for="firstname"></label>
                            <input type="text" id="firstname" />
                            <label for="lastname"></label>
                            <input type="text" id="lastname" />
                        </div>
                        <div className="edit-name-button-ctn">
                            <button className="edit-name-button save-button">
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
