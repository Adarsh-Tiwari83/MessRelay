import { useDispatch, useSelector } from "react-redux";
import Complaint from "../../components/Complaint/Complaint";
import { Link } from "react-router-dom";

import './ViewComplaints.scss'
import { useEffect } from "react";
import { viewAllComplaints } from "../../Actions/complaint";
import { loadUser } from "../../Actions/user";

const ViewComplaints = () => {
    const {complaints}=useSelector(state=>state.complaint);
    const {user}=useSelector(state=>state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadUser());
      dispatch(viewAllComplaints());
    },[dispatch]);
  return (
    <div className="complaintContainer">
      {complaints && complaints.map((complaint)=>(
                <Complaint key={complaint._id} complaint={complaint}/>
            ))    
        }
          {user.role==='Student' && <Link to="/newComplaint">New Complaint</Link>}
      </div>
  )
}

export default ViewComplaints