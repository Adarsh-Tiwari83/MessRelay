import { useState } from 'react';
import './Register.scss'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../Actions/user';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [hostel, setHostel] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    // const navigate=useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        console.log(email, password, role, hostel, name);
        dispatch(registerUser(name,email,password,role,hostel));
    }
  return(
      <div className="container">
          <h1>Register</h1>
          <div className="formContainer">
              <form action="" method="post" onSubmit={formHandler}>
                  <div className="formGroup">
                      <input onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' type="text" name="name" id="name" required />
                  </div>
                  <div className="formGroup">
                      <input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' type="email" name="email" id="email" required />
                  </div>
                  <div className="formGroup">
                      <select onChange={(e)=>setRole(e.target.value)} name="role">
                        <option value="">Who are you?</option>
                        <option value="Student">Student</option>
                        <option value="Warden">Warden</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Admin">Admin</option>
                      </select>
                  </div>
                  <div className="formGroup">
                      <select onChange={(e)=>setHostel(e.target.value)} name="hostel">
                        <option value="">Select Hostel</option>
                        <option value="Tandon">Tandon</option>
                        <option value="Malviya">Malviya</option>
                        <option value="Tilak">Tilak</option>
                        <option value="Patel">Patel</option>
                      </select>
                  </div>
                  <div className="formGroup">
                      <input onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' type="password" name="password" id="password" required />
                  </div>
                  <div className="formGroup">
                      <input placeholder='Re-enter your password' type="password" name="password" id="password" required />
                  </div>
                  <button type="submit">Login</button>
                  <p>Already Registered? Click <a href="/">here</a></p>
              </form>
          </div>
      </div>
  )
}

export default Register
