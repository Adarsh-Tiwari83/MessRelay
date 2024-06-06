import axios from '../utils/axiosInstance'
import {
  AddHostelRequest,
  AddHostelSuccess,
  AddHostelFailure,
  UpdateHostelRequest,
  UpdateHostelSuccess,
  UpdateHostelFailure,
  ViewHostelsRequest,
  ViewHostelsSuccess,
  ViewHostelsFailure,
  DeleteHostelRequest,
  DeleteHostelSuccess,
  DeleteHostelFailure,
} from "../Reducers/admin";
import { toast } from "react-toastify";

export const addHostel =
  (name, warden, accountant, messMenu) => async (dispatch) => {
    try {
      dispatch(AddHostelRequest());
      const { data } = await axios.post(
        "/api/v1/admin/hostel",
        { name, warden, accountant, messMenu },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(AddHostelSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(AddHostelFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

export const viewAllHostels = () => async (dispatch) => {
  try {
    dispatch(ViewHostelsRequest());
    const { data } = await axios.get("/api/v1/admin/hostel", {
      withCredentials: true,
    });
    dispatch(ViewHostelsSuccess(data.hostels));
    toast.success(data.message);
  } catch (error) {
    dispatch(ViewHostelsFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

export const updateHostel =
  (id, name, warden, accountant, messMenu) => async (dispatch) => {
    try {
      dispatch(UpdateHostelRequest());
      const { data } = await axios.put(
        `/api/v1/admin/hostel/${id}`,
        { name, warden, accountant, messMenu },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(UpdateHostelSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(UpdateHostelFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

export const deleteHostel = (id) => async (dispatch) => {
  try {
    dispatch(DeleteHostelRequest());
    const { data } = await axios.delete(`/api/v1/admin/hostel/${id}`, {
      withCredentials: true,
    });
    dispatch(DeleteHostelSuccess(data.message));
    toast.success(data.message);
  } catch (error) {
    dispatch(DeleteHostelFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
};
