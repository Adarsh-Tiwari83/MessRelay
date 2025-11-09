import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import NotFound from './Pages/NotFound/NotFound'


function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Only load user if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser()).finally(() => {
        setInitialLoad(false);
      });
    } else {
      setInitialLoad(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(viewAllComplaints());
    }
  }, [dispatch, isAuthenticated]);

  const renderComponent = (component) => {
    if (!isAuthenticated) {
      return component;
    } else if (user.role !== 'Admin') {
      return <StudentHome />;
    } else {
      return <ViewAllHostels />;
    }
  };

  return (
    initialLoad ? <Loader /> :
      (<>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={renderComponent(<Login />)} />
            <Route path="/register" element={renderComponent(<Register />)} />
            {isAuthenticated && user.role !== 'Admin' && <Route path="/viewComplaints" element={<ViewComplaints />} />}
            {isAuthenticated && user.role === 'Student' && <Route path="/newComplaint" element={< NewComplaint />} />}
            {isAuthenticated && user.role === 'Student' && <Route path="/rateMeal" element={< RateMeal />} />}
            {!isAuthenticated && <Route path="/adminRegister" element={< AdminRegister />} />}
            {isAuthenticated && user.role === 'Admin' && <Route path="/addHostel" element={< CreateHostel />} />}
            {isAuthenticated && user.role === 'Admin' && <Route path="/updateHostel" element={< UpdateHostel />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </>)
  )
}

export default App