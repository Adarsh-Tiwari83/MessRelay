import { useSelector} from 'react-redux'
import './StudentHome.scss'
import MessMenu from '../../components/MessMenu/MessMenu';
import { Link } from 'react-router-dom';


const StudentHome = () => {
  const { user, loading } = useSelector(state => state.user);
  console.log(user);
  return (
    loading ? (
      <h1>Loading...</h1>
    ) : (
      <div className='container'>
        <div className="innerContainer">
          <h1>{user.hostel.name}</h1>
          <div className="tableContainer">
            <MessMenu/>
            <Link to="/viewComplaints">Complaints</Link>
            <Link to="/rateMeal">Rate Today&apos;s meal</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default StudentHome
