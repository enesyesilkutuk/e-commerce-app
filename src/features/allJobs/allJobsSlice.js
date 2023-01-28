import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  async (_, thunkAPI) => {
    
    const { search, page, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

    if (search) {
      url += `&search=${search}`;
    };

    try {
      const res = await customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      console.log(res.data)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const showStats = createAsyncThunk("allJobs/showStats", async(_,thunkAPI) => {
  try {
    const res = await customFetch.get("/jobs/stats", {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      }
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, {payload: {name, value}}) => {
      // state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllJobs.pending, (state) => {
    state.isLoading = true;
    })
    .addCase(getAllJobs.fulfilled, (state, {payload}) => {
        const { jobs, totalJobs, numOfPages } = payload;
        state.isLoading = false;
        state.jobs = jobs;
        state.totalJobs = totalJobs;
        state.numOfPages = numOfPages;
    })
    .addCase(getAllJobs.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
    })
    .addCase(showStats.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(showStats.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    })
    .addCase(showStats.rejected, (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload);
    })
  },
});

export default allJobsSlice.reducer;
export const { showLoading, hideLoading, clearFilters, handleChange, changePage } = allJobsSlice.actions;
