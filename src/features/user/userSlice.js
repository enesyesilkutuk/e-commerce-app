import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
   return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, {payload}) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Helo there ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        toast.success("User updated");
        addUserToLocalStorage(user);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default userSlice.reducer;
export const { toggleSidebar, logoutUser } = userSlice.actions;

// The old version of extraReducers

// extraReducers: {
//     [registerUser.pending] : (state) => {
//         state.isLoading = true;
//     },
//     [registerUser.fulfilled] : (state, {payload}) => {
//         const { user } = payload;
//         state.isLoading = false;
//         state.user = user;
//         addUserToLocalStorage(user);
//         toast.success(`hello there ${user.name}`);
//     },
//     [registerUser.rejected] : (state, {payload}) => {
//         state.isLoading = false;
//         toast.error(payload)
//     },
//     [loginUser.pending] : (state) => {
//         state.isLoading = true;
//     },
//     [loginUser.fulfilled] : (state, {payload}) => {
//         const { user } = payload;
//         state.isLoading = false;
//         state.user = user;
//         addUserToLocalStorage(user);
//         toast.success(`welcome back ${user.name}`);
//     },
//     [loginUser.rejected] : (state, {payload}) => {
//         state.isLoading = false;
//         toast.error(payload);
//     },
// }

// -----------------------------------------------

// The long version of http request functions

// export const registerUser = createAsyncThunk("user/registerUser", async (user,thunkAPI) => {
//     try {
//         const res = await customFetch.post("/auth/register", user);
//         return res.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
// });

// export const loginUser = createAsyncThunk("user/loginUser", async (user,thunkAPI) => {
//     try {
//         const res = await customFetch.post("/auth/login", user);
//         return res.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
// });

// export const updateUser = createAsyncThunk("user/updateUser", async(user, thunkAPI) => {
//     try {
//        const res = await customFetch.patch("/auth/updateUser", user, {
//             headers: {
//                 Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
//             }
//        });
//        console.log(res);
//         return res.data;
//     } catch (error) {
//         if (error.response.status === 401) {
//             thunkAPI.dispatch(logoutUser())
//         }
//         return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
// });
