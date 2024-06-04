import { useSelector} from 'react-redux'
import './StudentHome.scss'
import MessMenu from '../../components/MessMenu/MessMenu';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Typewriter from 'typewriter-effect';

const StudentHome = () => {
  const { user, loading } = useSelector(state => state.user);
  console.log(user);
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
            <Link to="/rateMeal">Rate Today&apos;s meal</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default StudentHome
