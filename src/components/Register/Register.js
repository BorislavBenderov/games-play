import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
    const navigate = useNavigate();
    const { onLogin } = useContext(AuthContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target);

        const email = formdata.get('email');
        const password = formdata.get('password');
        const confirmPassword = formdata.get('confirm-password');

        if (password !== confirmPassword) {
            return;
        }

        authService.register(email, password)
        .then(authData => {
            onLogin(authData);
            navigate('/');
        })
    }


    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                    />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" />
                    <input className="btn submit" type="submit" defaultValue="Register" />
                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>

    );
}