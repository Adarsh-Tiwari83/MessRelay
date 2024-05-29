import axios from "axios";

import {CreateComplaintFailure, CreateComplaintRequest, CreateComplaintSuccess, DeleteComplaintFailure, DeleteComplaintRequest, DeleteComplaintSuccess, downvoteComplaintFailure, downvoteComplaintRequest, downvoteComplaintSuccess, editComplaintFailure, editComplaintRequest, editComplaintSuccess, upvoteComplaintFailure, upvoteComplaintRequest, upvoteComplaintSuccess, viewAllComplaintsFailure, viewAllComplaintsRequest, viewAllComplaintsSuccess} from '../Reducers/complaint'

export const addComplaint = (title,description) =>async(dispatch) =>{
    try{
        dispatch(CreateComplaintRequest());
        const {data}=await axios.post('http://localhost:3000/api/v1/student/complaint',{
            title,
            description
        },{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        console.log(data);
        dispatch(CreateComplaintSuccess(data.message));
    }catch(error){
        console.log(error);
        dispatch(CreateComplaintFailure(error.response.data.message));
    }
}

export const viewAllComplaints=()=>async(dispatch)=>{
    try{
        dispatch(viewAllComplaintsRequest());
        const {data}=await axios.get('http://localhost:3000/api/v1/student/allComplaints',{
            withCredentials:true
        });
        console.log(data);
        dispatch(viewAllComplaintsSuccess(data.complaints));
    }catch(error){
        dispatch(viewAllComplaintsFailure(error.response.data.message));
    }
}

export const deleteComplaint=(id)=>async(dispatch)=>{
    try{
        dispatch(DeleteComplaintRequest());
        const {data}=await axios.delete(`http://localhost:3000/api/v1/student/complaint/${id}`,{
            withCredentials:true
        });
        dispatch(DeleteComplaintSuccess(data.message));
    }
    catch(error){
        dispatch(DeleteComplaintFailure(error.response.data.message));
    }
}

export const upvoteComplaint=(id)=>async(dispatch)=>{
    try{
        dispatch(upvoteComplaintRequest());
        const {data}=await axios.get(`http://localhost:3000/api/v1/student/upvoteComplaint/${id}`,{
            withCredentials:true
        });
        console.log(data);
        dispatch(upvoteComplaintSuccess(data.message));
    }catch(error){
        dispatch(upvoteComplaintFailure(error.response.data.message));
    }
}

export const downvoteComplaint=(id)=>async(dispatch)=>{
    try{
        dispatch(downvoteComplaintRequest());
        const {data}=await axios.get(`http://localhost:3000/api/v1/student/downvoteComplaint/${id}`,{
            withCredentials:true
        });
        console.log(data);
        dispatch(downvoteComplaintSuccess(data.message));
    }catch(error){
        dispatch(downvoteComplaintFailure(error.response.data.message));
    }
}

export const editComplaint=(id,title,description)=>async(dispatch)=>{
    try{
        dispatch(editComplaintRequest());
        const {data}=await axios.put(`http://localhost:3000/api/v1/student/complaint/${id}`,{
            title,
            description
        },{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        console.log(data);
        dispatch(editComplaintSuccess(data.message));
    }catch(error){
        console.log(error);
        dispatch(editComplaintFailure(error.response.data.message));
    }
}