import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Job from "./Job";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { jobs, isLoading, totalJobs, search, page, searchStatus, searchType, sort,  numOfPages } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch, search, page, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* <h5>{jobs.length > 1 ? `${jobs.length} jobs found` : `${jobs.length} job found`}</h5> */}
      <h5>{totalJobs} job{totalJobs > 1 && 's'} found</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {  <PageBtnContainer /> }
    </Wrapper>
  );
};

export default JobsContainer;
