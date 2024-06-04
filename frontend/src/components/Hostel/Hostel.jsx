import { useState } from "react";
import UpdateHostel from "../../Pages/UpdateHostel/UpdateHostel";
import { useDispatch } from "react-redux";
import { deleteHostel } from "../../Actions/admin";
import MessMenu from "../MessMenu/MessMenu";
import './Hostel.scss';

const Hostel = ({ hostel }) => {
    const dispatch = useDispatch();
    const [isEditClicked, setIsEditClicked] = useState(false);
    const editHandler = () => {
        setIsEditClicked(true);
    }
    const deleteHandler = () => {
        dispatch(deleteHostel(hostel._id));
        window.location.reload();
    }

    return isEditClicked ? (<UpdateHostel setIsEditClicked={setIsEditClicked} hostel={hostel} />) : (
        <div className="hostelContainer">
            <h1 className="hostelHeader">{hostel?.name} Hostel</h1>
            <p className="hostelDetails">Warden: {hostel?.warden}</p>
            <p className="hostelDetails">Accountant: {hostel?.accountant}</p>
            <MessMenu messMenu={hostel?.messMenu} />
            <div className="buttonContainer">
                <button className="editButton" onClick={editHandler}>Edit</button>
                <button className="deleteButton" onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    )
}

export default Hostel
