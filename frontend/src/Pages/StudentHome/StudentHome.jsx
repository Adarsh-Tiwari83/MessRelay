import { useDispatch, useSelector} from 'react-redux'
import './StudentHome.scss'
import MessMenu from '../../components/MessMenu/MessMenu';
import Loader from '../../components/Loader/Loader';
import Typewriter from 'typewriter-effect';
import { useEffect } from 'react';
import { loadUser } from '../../Actions/user';
import { viewAllComplaints } from '../../Actions/complaint';
import { Link } from 'react-router-dom';

const StudentHome = () => {
  const { user,loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(viewAllComplaints());
  }, [dispatch]);
  return (
    loading ? (
      <Loader />
    ) : (
      <div className='container'>
        <div className="innerContainer">
          <h1>
            <Typewriter
              options={{
                strings: [`Welcome ${user?.name}`, `To ${user?.hostel?.name} Hostel`],
                autoStart: true,
                loop: true,
              }}
            />
            </h1>
          <div className="tableContainer">
            {user && user?.hostel && user?.hostel?.messMenu && <MessMenu messMenu={user?.hostel?.messMenu}/>}
            <Link to="/viewComplaints">Complaints</Link>
            {user.role==='Student' && <Link to="/rateMeal">Rate Today&apos;s meal</Link>}
          </div>
        </div>
      </div>
    )
  );
};

export default StudentHome
