import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { viewAllHostels } from "../../Actions/admin";
import Hostel from "../../components/Hostel/Hostel";
import { Link } from "react-router-dom";

const ViewAllHostels = () => {
  const {hostels}=useSelector(state=>state.admin);
  const dispatch=useDispatch();
  console.log(hostels);
  useEffect(() => {
    dispatch(viewAllHostels());
  }, [])
  
  return (
    <div>
      {hostels && hostels?.map((hostel)=>(
        <div key={hostel?._id}>
          <Hostel hostel={hostel}/>
        </div>
      ))}
      <Link to={'/addHostel'}>Add New Hostel</Link>
    </div>
  )
}

export default ViewAllHostels
