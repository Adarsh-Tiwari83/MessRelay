import { useState } from 'react'
import './Login.scss'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../../Actions/user'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const {loading}=useSelector(state=>state.user);
  const submitHandler = async(e) => {
    e.preventDefault()
    console.log(email, password);
    await dispatch(loginUser(email,password));
  }
  return (
    loading?(<h1>Loading...</h1>):(
      <div className="container">
        <h1>Login</h1>
        <div className="formContainer">
          <form action="" method="post" onSubmit={submitHandler}>
            <div className="formGroup">
              <input onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' type="email" name="email" id="email" required />
            </div>
            <div className="formGroup">
              <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' type="password" name="password" id="password" required />
            </div>
            <button type="submit">Login</button>
            <p>Not Registered? Click <a href="/register">here</a></p>
          </form>
        </div>
      </div>
    )
  )
}

export default Login
