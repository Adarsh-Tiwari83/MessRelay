import { useState } from 'react';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Actions/user';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
    navigate('/');
  };

  return (
    loading ? (<Loader/>) : (
      <div className="loginContainer">
        <h1>Login</h1>
        <div className="loginFormContainer">
          <form action="" method="post" onSubmit={submitHandler}>
            <div className="loginFormGroup">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="loginFormGroup">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                name="password"
                id="password"
                required
              />
            </div>
            <button className="loginSubmitButton" type="submit">Login</button>
            <p>Not Registered? Click <a href="/register">here</a></p>
          </form>
        </div>
      </div>
    )
  );
};

export default Login;
