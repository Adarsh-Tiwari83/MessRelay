import { useDispatch, useSelector } from 'react-redux'
import './Navbar.scss'
import { logoutUser } from '../../Actions/user';
const Navbar = () => {
  const {isAuthenticated}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    dispatch(logoutUser());
  }
  const homeHandler=()=>{
    window.location.href='/';
  }
  const complaintsHandler=()=>{
    window.location.href='/viewComplaints';
  }
  return (
    <div className="navContainer">
      <h1>Mess Management System</h1>
      {isAuthenticated && <button onClick={homeHandler}>Home</button>}
      {isAuthenticated && <button onClick={complaintsHandler}>Complaints</button>}
      {isAuthenticated && <button onClick={logoutHandler}>Logout</button>}
    </div>
  )
}

export default Navbar
