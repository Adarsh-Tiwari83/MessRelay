import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Login/Login'
import './App.scss'
import Register from './Pages/Register/Register'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/user'
import StudentHome from './Pages/StudentHome/StudentHome'
import ViewComplaints from './Pages/ViewAllComplaints/ViewComplaints'
import NewComplaint from './Pages/NewComplaint/NewComplaint'
import { viewAllComplaints } from './Actions/complaint'
import RateMeal from './Pages/RateMeal/RateMeal'
import Loader from './components/Loader/Loader'
import AdminRegister from './Pages/AdminRegister/AdminRegister'
import CreateHostel from './Pages/CreateHostel/CreateHostel';
import UpdateHostel from './Pages/UpdateHostel/UpdateHostel';
import ViewAllHostels from './Pages/ViewAllHostels/ViewAllHostels'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
        dispatch(viewAllComplaints());
        setInitialLoad(false);
    }, [])
  const { isAuthenticated} = useSelector((state) => state.user);
    return (
    initialLoad?<Loader/>:
    (<>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={(isAuthenticated)?<StudentHome/>:<Login />} />
          <Route path="/register" element={(isAuthenticated) ? <StudentHome /> : <Register/>} />
          <Route path="/viewComplaints" element={isAuthenticated ? <ViewComplaints /> : <Login/>} />
          <Route path="/newComplaint" element={isAuthenticated ? < NewComplaint/> : <Login/>} />
          <Route path="/rateMeal" element={isAuthenticated ? < RateMeal/> : <Login/>} />
          <Route path="/adminRegister" element={< AdminRegister/> } />
          <Route path="/admin" element={< ViewAllHostels/> } />
          <Route path="/addHostel" element={< CreateHostel/> } />
          <Route path="/updateHostel" element={< UpdateHostel/> } />
        </Routes>
      </Router>
</>)
  )
}

export default App