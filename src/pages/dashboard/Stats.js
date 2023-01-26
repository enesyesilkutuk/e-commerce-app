import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartsContainer, Loading, StatsContainer } from '../../components';
import { showStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
 const dispatch = useDispatch();
 const {isLoading, monthlyApplications} = useSelector((store) => store.allJobs);
 useEffect(() => {
  dispatch(showStats())
 }, [dispatch]);
 
  return (
    <>
    <StatsContainer />
    {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats;