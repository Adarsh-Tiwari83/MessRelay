import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComplaint, viewAllComplaints } from "../../Actions/complaint"
import { useNavigate } from "react-router-dom"


const NewComplaint = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const submitHandler = async(e) => {
        e.preventDefault()
        console.log(title, description);
        await dispatch(addComplaint(title,description));
        await dispatch(viewAllComplaints());
        navigate('/viewComplaints');
    }
  return (
    <div className="container">
      <div className="formContainer">
        <form action="" method="post" onSubmit={submitHandler}>
            <div className="formGroup">
                <input onChange={(e)=>setTitle(e.target.value)} placeholder='Enter your complaint title' type="text" name="title" id="title" required />
            </div>
            <div className="formGroup">
                <textarea onChange={(e)=>setDescription(e.target.value)} placeholder='Enter your complaint description' name="description" id="description" required />
            </div>
            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default NewComplaint
