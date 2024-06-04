import { useState } from 'react';
import './Register.scss';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Actions/user';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [hostel, setHostel] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password, role, hostel));
        navigate('/');
    };

    return (
        <div className="registerContainer">
            <h1>Register</h1>
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
                        <select onChange={(e) => setRole(e.target.value)} name="role" required>
                            <option value="">Who are you?</option>
                            <option value="Student">Student</option>
                            <option value="Warden">Warden</option>
                        </select>
                    </div>
                    <div className="registerFormGroup">
                        <select onChange={(e) => setHostel(e.target.value)} name="hostel" required>
                            <option value="">Select Hostel</option>
                            <option value="Tandon">Tandon</option>
                            <option value="Malviya">Malviya</option>
                            <option value="Tilak">Tilak</option>
                            <option value="Patel">Patel</option>
                        </select>
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
                    <p>Admin? Click <a href="/adminRegister">here</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;