import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        LoginRequest: (state) => {
            state.loading=true
        },
        LoginSuccess: (state, action) => {
            state.loading=false
            state.user=action.payload
            state.isAuthenticated=true
        },
        LoginFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
            state.isAuthenticated = false;
        },
        RegisterRequest: (state) => {
            state.loading=true
        },
        RegisterSuccess: (state, action) => {
            state.loading=false
            state.user=action.payload
            state.isAuthenticated=true
        },
        RegisterFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
            state.isAuthenticated = false;
        },
        LoadUserRequest: (state) => {
            state.loading=true
        },
        LoadUserSuccess: (state, action) => {
            state.loading=false
            state.user=action.payload
            state.isAuthenticated=true
        },
        LoadUserFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
            state.isAuthenticated = false;
        },
        LogoutRequest: (state) => {
            state.loading=true
        },
        LogoutSuccess: (state) => {
            state.loading=false
            state.user=null
            state.isAuthenticated=false
        },
        LogoutFailure: (state, action) => {
            state.loading=false
            state.error=action.payload,
            state.isAuthenticated = true;
        },
        rateMealRequest: (state) => {
            state.loading=true
        },
        rateMealSuccess: (state, action) => {
            state.loading=false
            state.message=action.payload
        },
        rateMealFailure: (state, action) => {
            state.loading=false
            state.error=action.payload
        },
    },
});



export const {LoginRequest, LoginSuccess, LoginFailure, RegisterRequest, RegisterSuccess, RegisterFailure, LoadUserRequest, LoadUserSuccess, LoadUserFailure, LogoutRequest, LogoutSuccess, LogoutFailure, rateMealRequest, rateMealSuccess, rateMealFailure
} = userSlice.actions;
export {userSlice};