import axios from "../utils/axiosInstance";
import {
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  RegisterSuccess,
  RegisterRequest,
  RegisterFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFailure,
  rateMealRequest,
  rateMealSuccess,
  rateMealFailure,
  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,
} from "./../Reducers/user";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginRequest());
    const { data } = await axios.post(
      "/api/v1/student/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(LoginSuccess(data.user));
  } catch (error) {
    dispatch(LoginFailure(error.response.data.message));
  }
};

export const registerUser =
  (name, email, password, role, hostel) => async (dispatch) => {
    try {
      dispatch(RegisterRequest());
      const { data } = await axios.post(
        "/api/v1/student/register",
        { name, email, password, role, hostel },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch(RegisterSuccess(data.user));
    } catch (error) {
      dispatch(RegisterFailure(error.response.data.message));
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get("/api/v1/student/profile", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFailure(error.response.data.message));
  }
};

export const rateMeal = (mealType, rating) => async (dispatch) => {
  try {
    console.log(mealType, rating);
    dispatch(rateMealRequest());
    const { data } = await axios.post(
      "/api/v1/student/rate-meal",
      {
        mealType,
        rating,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch(rateMealSuccess(data.message));
  } catch (error) {
    dispatch(rateMealFailure(error.response.data.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(LogoutRequest());
    const { data } = await axios.get("/api/v1/student/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(data);
    window.location.reload();
    dispatch(LogoutSuccess(data.message));
  } catch (error) {
    dispatch(LogoutFailure(error.response.data.message));
  }
};
