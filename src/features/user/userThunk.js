import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
    try {
        const res = await customFetch.post(url, user);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const loginUserThunk = async (url, user, thunkAPI)=> {
    try {
        const res = await customFetch.post(url, user);
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const res = await customFetch.patch(url, user, {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        return res.data;
      } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
      }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};