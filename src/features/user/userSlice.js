import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage, addUserToLocalStorage } from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk("user/registerUser", async (user,thunkAPI) => {
    try {
        const res = await customFetch.post("/auth/register", user);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async (user,thunkAPI) => {
    try {
        const res = await customFetch.post("/auth/login", user);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, {payload}) => {
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
        }
    });


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

export default userSlice.reducer;
