import {createSlice} from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: 'admin',
    initialState: {},
    reducers:{
        AddHostelRequest: (state) => {
            state.loading=true
        },
        AddHostelSuccess: (state, action) => {
            state.loading=false
            state.message=action.payload
        },
        AddHostelFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
        },
        UpdateHostelRequest: (state) => {
            state.loading=true
        },
        UpdateHostelSuccess: (state, action) => {
            state.loading=false
            state.message=action.payload
        },
        UpdateHostelFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
        },
        ViewHostelsRequest: (state) => {
            state.loading=true
        },
        ViewHostelsSuccess: (state, action) => {
            state.loading=false
            state.hostels=action.payload
        },
        ViewHostelsFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
        },
        DeleteHostelRequest: (state) => {
            state.loading=true
        },
        DeleteHostelSuccess: (state, action) => {
            state.loading=false
            state.message=action.payload
        },
        DeleteHostelFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
        }
    }
})

export const {AddHostelRequest, AddHostelSuccess, AddHostelFailure, UpdateHostelRequest, UpdateHostelSuccess, UpdateHostelFailure, ViewHostelsRequest, ViewHostelsSuccess, ViewHostelsFailure, DeleteHostelRequest, DeleteHostelSuccess, DeleteHostelFailure} = adminSlice.actions
export {adminSlice}