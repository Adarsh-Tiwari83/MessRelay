import { Link } from 'react-router-dom';
import './NotFound.scss'; // Add some styling if you want
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';

const NotFound = () => {
    const {loading}=useSelector(state=>state.user);
    return loading?<Loader/>: (
        <div className="not-found">
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default NotFound;
