import { useDispatch, useSelector } from 'react-redux'
import './Navbar.scss'
import { logoutUser } from '../../Actions/user';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  }
  const homeHandler = () => {
    window.location.href = '/';
  }
  const complaintsHandler = () => {
    window.location.href = '/viewComplaints';
  }
  return (
    <div className="navContainer">
      <h1>Mess Management System</h1>
      <div>
        {isAuthenticated && <button onClick={homeHandler}>Home</button>}
        {isAuthenticated && user.role !== 'Admin' && <button onClick={complaintsHandler}>Complaints</button>}
        {isAuthenticated && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </div>
  )
}

export default Navbar
