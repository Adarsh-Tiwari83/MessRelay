import { createSlice } from "@reduxjs/toolkit";



const complaintSlice = createSlice({
    name: "complaint",
    initialState: {},
    reducers: {
        CreateComplaintRequest: (state) => {
        state.loading = true;
        },
        CreateComplaintSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        },
        CreateComplaintFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        DeleteComplaintRequest: (state) => {
        state.loading = true;
        },
        DeleteComplaintSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        },
        DeleteComplaintFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        viewAllComplaintsRequest: (state) => {
        state.loading = true;
        },
        viewAllComplaintsSuccess: (state, action) => {
        state.loading = false;
        state.complaints = action.payload;
        },
        viewAllComplaintsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        editComplaintRequest: (state) => {
        state.loading = true;
        },
        editComplaintSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        },
        editComplaintFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        upvoteComplaintRequest: (state) => {
        state.loading = true;
        },
        upvoteComplaintSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        },
        upvoteComplaintFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        downvoteComplaintRequest: (state) => {
        state.loading = true;
        },
        downvoteComplaintSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        },
        downvoteComplaintFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        
    }
});

export const {  CreateComplaintRequest, CreateComplaintSuccess, CreateComplaintFailure, DeleteComplaintRequest, DeleteComplaintSuccess, DeleteComplaintFailure ,viewAllComplaintsFailure,viewAllComplaintsRequest,viewAllComplaintsSuccess,upvoteComplaintFailure,upvoteComplaintRequest,upvoteComplaintSuccess,downvoteComplaintFailure,downvoteComplaintRequest,downvoteComplaintSuccess,editComplaintRequest,editComplaintFailure,editComplaintSuccess} = complaintSlice.actions;
export {complaintSlice}