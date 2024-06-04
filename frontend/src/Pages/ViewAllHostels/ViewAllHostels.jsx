import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewAllHostels } from "../../Actions/admin";
import Hostel from "../../components/Hostel/Hostel";
import { Link } from "react-router-dom";
import './ViewAllHostels.scss';

const ViewAllHostels = () => {
  const { hostels } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewAllHostels());
  }, [dispatch]);

  return (
    <div className="viewAllHostelsContainer">
      <h1 className="header">All Hostels</h1>
      {hostels && hostels.map((hostel) => (
        <div key={hostel._id} className="hostelCard">
          <Hostel hostel={hostel} />
        </div>
      ))}
      <Link to="/addHostel" className="addHostelLink">Add New Hostel</Link>
    </div>
  );
}

export default ViewAllHostels;