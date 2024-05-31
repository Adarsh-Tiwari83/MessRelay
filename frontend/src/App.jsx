import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Login/Login'
import './App.scss'
import Register from './Pages/Register/Register'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/user'
import StudentHome from './Pages/StudentHome/StudentHome'
import ViewComplaints from './Pages/ViewAllComplaints/ViewComplaints'
import NewComplaint from './Pages/NewComplaint/NewComplaint'
import { viewAllComplaints } from './Actions/complaint'
import RateMeal from './Pages/RateMeal/RateMeal'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadUserDetails() {
      await dispatch(loadUser());
    }
    loadUserDetails();
  }, []);

  useEffect(() => {
    async function loadComplaints() {
      await dispatch(viewAllComplaints());
    }
    loadComplaints();
  },[]);

  const { isAuthenticated,loading} = useSelector((state) => state.user);
  console.log("Loading",loading);
  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={(isAuthenticated)?<StudentHome/>:<Login />} />
          <Route path="/register" element={(isAuthenticated) ? <StudentHome /> : <Register/>} />
          <Route path="/viewComplaints" element={isAuthenticated ? <ViewComplaints /> : <Login/>} />
          <Route path="/newComplaint" element={isAuthenticated ? < NewComplaint/> : <Login/>} />
          <Route path="/rateMeal" element={isAuthenticated ? < RateMeal/> : <Login/>} />
        </Routes>
      </Router>
</>
  )
}

export default App
