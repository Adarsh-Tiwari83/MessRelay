import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./Reducers/user";
import { complaintSlice } from "./Reducers/complaint";
import { adminSlice } from "./Reducers/admin";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    complaint: complaintSlice.reducer,
    admin: adminSlice.reducer
  },
});

export default store;
