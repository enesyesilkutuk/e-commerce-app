import React from "react";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useDispatch, useSelector } from "react-redux";
import { FormRow, FormRowSelect } from ".";
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice";
import { useState, useMemo } from "react";

const SearchContainer = () => {

  const [localSearch, setLocalSearch] = useState("");
  const dispatch = useDispatch();
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
    const { statusOptions, jobTypeOptions } = useSelector((store) => store.job);
  
  const handleSearch = (e) => {
    // if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({name: e.target.name, value: e.target.value}));
      }, 1000);
    }
  };

  const optimizedDebounce =  useMemo(debounce, [debounce]);

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
        
        {/* search position */}
        
        <FormRow type="text" name="search" handleChange={optimizedDebounce} value={localSearch} />
        
        {/* search by status */}
        
        <FormRowSelect labelText="status" value=
        {searchStatus} name="searchStatus" handleChange={handleSearch} list={["all", ...statusOptions]} />
        
        {/* search by type */}
        
        <FormRowSelect labelText="type" value={searchType} name="searchType" handleChange={handleSearch} list={["all", ...jobTypeOptions]} />
        
        {/* sort */}
        
        <FormRowSelect value={sort} name="sort" handleChange={handleSearch} list={sortOptions} />
        
        <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>clear filters</button>
        
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
