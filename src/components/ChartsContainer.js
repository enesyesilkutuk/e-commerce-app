import React, { useState} from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import { useSelector } from "react-redux";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications : data } = useSelector((store) => store.allJobs);
  return (
   <Wrapper>
    <h4>monthy applications</h4>
    <button type='button' onClick={() => setBarChart((prevState) => !prevState)}>{barChart ? 'area chart' : 'bar chart'}</button>
    {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
  </Wrapper>
  )
}

export default ChartsContainer;
