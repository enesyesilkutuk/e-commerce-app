import React, { useState} from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from "react-redux";
import AreaChartComponent from './AreaChart';
import BarChartComponent from './BarChart'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications : data } = useSelector((store) => store.allJobs);
  return (
   <Wrapper>
    <h4>monthy applications</h4>
    <button type='button' onClick={() => setBarChart((prevState) => !prevState)}>{barChart ? 'area chart' : 'bar chart'}</button>
    {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
  </Wrapper>
  )
}

export default ChartsContainer;
