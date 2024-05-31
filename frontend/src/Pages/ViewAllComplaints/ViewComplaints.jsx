import { useSelector } from "react-redux";
import Complaint from "../../components/Complaint/Complaint";
import { Link } from "react-router-dom";

import './ViewComplaints.scss'

const ViewComplaints = () => {
    const {complaints}=useSelector(state=>state.complaint);
    console.log(complaints);
    
  return (
    <div className="complaintContainer">
      {complaints && complaints.map((complaint)=>(
                <Complaint key={complaint._id} complaint={complaint}/>
            ))    
        }
          <Link to="/newComplaint">New Complaint</Link>
      </div>
  )
}

export default ViewComplaints
