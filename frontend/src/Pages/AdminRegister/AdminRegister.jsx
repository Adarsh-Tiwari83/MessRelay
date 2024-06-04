import { useState } from 'react';
import './AdminRegister.scss';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Actions/user';

const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password, 'Admin'));
        window.location.href = '/admin';
    };

    return (
        <div className="registerContainer">
            <h1>Register as Admin</h1>
            <div className="registerFormContainer">
                <form action="" method="post" onSubmit={formHandler}>
                    <div className="registerFormGroup">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            type="text"
                            name="name"
                            id="name"
                            required
                        />
                    </div>
                    <div className="registerFormGroup">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                            id="email"
                            required
                        />
                    </div>
                    <div className="registerFormGroup">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </div>
                    <div className="registerFormGroup">
                        <input
                            placeholder="Re-enter your password"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                        />
                    </div>
                    <button className="registerSubmitButton" type="submit">Register</button>
                    <p>Already Registered? Click <a href="/">here</a></p>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;