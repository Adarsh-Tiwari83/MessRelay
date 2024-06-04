import { Link } from 'react-router-dom';
import './NotFound.scss'; // Add some styling if you want

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default NotFound;
