import { useState } from "react";
import UpdateHostel from "../../Pages/UpdateHostel/UpdateHostel";
import { useDispatch } from "react-redux";
import { deleteHostel } from "../../Actions/admin";
import MessMenu from "../MessMenu/MessMenu";

const Hostel = ({hostel}) => {
    const dispatch=useDispatch();
    const [isEditClicked, setIsEditClicked] = useState(false);
    const editHandler = () => {
        setIsEditClicked(true);
    }
    const deleteHandler = () => {
        dispatch(deleteHostel(hostel._id));
        window.location.reload();
    }
    
    return isEditClicked ? (<UpdateHostel setIsEditClicked={setIsEditClicked} hostel={hostel} />): (
    <div>
          <h1>{hostel?.name} Hostel</h1>
          <p>Warden: {hostel?.warden}</p>
          <p>Accountant: {hostel?.accountant}</p>
          <MessMenu messMenu={hostel?.messMenu} />
          <button onClick={editHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default Hostel
