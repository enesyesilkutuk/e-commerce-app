import React from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddJob = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("please fill out all fields");
      return;
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            value={position}
            name="position"
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            value={company}
            name="company"
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            value={jobLocation}
            name="jobLocation"
            labelText="job location"
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect
          value={status}
          name="status"
          handleChange={handleJobInput}
          list={statusOptions}
          />
          {/* jobType */}
          <FormRowSelect
          value={jobType}
          labelText="job type"
          name="jobType"
          handleChange={handleJobInput}
          list={jobTypeOptions}
          />
          <div className="btn-container">
            <button type="button" className="btn btn-block clear-btn" onClick={() => console.log("clear values")}>clear</button>
            <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit}
            disabled={isLoading}>submit</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
