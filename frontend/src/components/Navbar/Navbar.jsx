import { useDispatch, useSelector } from 'react-redux'
import './Navbar.scss'
import { logoutUser } from '../../Actions/user';
const Navbar = () => {
  const {isAuthenticated}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    dispatch(logoutUser());
  }
  return (
    <div className="navContainer">
      <h1>Mess Management System</h1>
      {isAuthenticated && <button onClick={logoutHandler}>Logout</button>}
    </div>
  )
}

export default Navbar
