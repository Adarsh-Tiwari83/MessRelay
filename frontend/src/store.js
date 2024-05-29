import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./Reducers/user";
import { complaintSlice } from "./Reducers/complaint";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    complaint: complaintSlice.reducer,
  },
});

export default store;
