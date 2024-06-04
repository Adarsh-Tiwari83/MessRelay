import { useDispatch, useSelector } from "react-redux"
import { deleteComplaint, downvoteComplaint, upvoteComplaint, viewAllComplaints } from "../../Actions/complaint";
import { loadUser } from "../../Actions/user";
import './Complaint.scss'
import { useEffect, useState } from "react";
import EditComplaint from "../../Pages/EditComplaint/EditComplaint";

const Complaint = ({complaint}) => {
  const [upvoted,setUpvoted]=useState();
  const [downvoted,setDownvoted]=useState();
  const [isEditClicked,setIsEditClicked]=useState(false);
  const {user} = useSelector(state => state.user);
  const dispatch=useDispatch();
  const editHandler = () => {
    setIsEditClicked(true);
  }
  const deleteHandler = async() => {
    await dispatch(deleteComplaint(complaint?._id));
    dispatch(viewAllComplaints());
    dispatch(loadUser());
  }
  const upvoteHandler = async() => {
    await dispatch(upvoteComplaint(complaint?._id));
    if(upvoted && !downvoted){
      setUpvoted(false);
    }
    else if(!upvoted && downvoted){
      setUpvoted(true);
      setDownvoted(false);
    }
    else setUpvoted(true);
    dispatch(viewAllComplaints());
    dispatch(loadUser());
}

const downvoteHandler = async() => {
    await dispatch(downvoteComplaint(complaint?._id));
    if(!upvoted && downvoted){
      setDownvoted(false);
    }
    else if (upvoted && !downvoted) {
      setDownvoted(true);
      setUpvoted(false);
    }
    else setDownvoted(true);
    dispatch(viewAllComplaints());
    dispatch(loadUser());
  }
  useEffect(() => {
    if (complaint?.upvotes?.includes(user?._id)) {
      setUpvoted(true);
    }
    else setUpvoted(false);
    if (complaint?.downvotes?.includes(user?._id)) {
      setDownvoted(true);
    }
    else setDownvoted(false);
},[]);
console.log(complaint);
  return (
    isEditClicked?(
      <>
      <EditComplaint setIsEditClicked={setIsEditClicked} complaint={complaint}/>
      </>
  ):(
          <div className="complaintItem">
                <h1>{complaint?.title}</h1>
                <p>{complaint?.description}</p>
                <div className="btnwrapper">
                  <button style={upvoted?{color:'white',backgroundColor:"black"}:{color:'black',backgroundColor:'white'}} onClick={upvoteHandler}>{complaint?.upvotes?.length} 👍</button>
        <button style={downvoted ? { color: 'white', backgroundColor: "black" } : { color: 'black', backgroundColor: 'white' }} onClick={downvoteHandler}>{complaint?.downvotes?.length} 👎</button>
                </div>
                <span>Complaint raised by - {complaint?.student?.name}</span>
                <div className="btnwrapper">
        {user?._id === complaint?.student?._id && <button onClick={editHandler}>Edit</button>}
        {user?._id === complaint?.student?._id && <button onClick={deleteHandler}>Delete</button>}
                </div>
          </div>)
  )
}

export default Complaint