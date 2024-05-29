import { useState } from "react"
import { useDispatch } from "react-redux"
import { editComplaint, viewAllComplaints } from "../../Actions/complaint"
import { loadUser } from "../../Actions/user"


const EditComplaint = ({complaint,setIsEditClicked}) => {
  const [title, setTitle] = useState(complaint.title||'')
  const [description, setDescription] = useState(complaint.description||'')
  const dispatch=useDispatch();
  
    const submitHandler = async(e) => {
        e.preventDefault()
        await dispatch(editComplaint(complaint._id,title,description));
        await dispatch(viewAllComplaints());
        await dispatch(loadUser());
        setIsEditClicked(false);
    }
  return(
    <div className='container'>
      <p>Edit Complaint</p>
      <button onClick={() => setIsEditClicked(false)}>Back</button>
      <div className="formContainer">
              <form action="" method="post" onSubmit={submitHandler}>
                  <div className="formGroup">
                      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter your complaint title' type="text" name="title" id="title" required />
                  </div>
                  <div className="formGroup">
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter your complaint description' name="description" id="description" required />
                  </div>
                  <button type="submit">Submit</button>
              </form>
      </div>
    </div>
  )
}

export default EditComplaint
