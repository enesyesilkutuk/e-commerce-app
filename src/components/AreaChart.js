import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={300} style={{border: "1px solid red"}}>
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 50,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
    </AreaChart>
  </ResponsiveContainer>
  )
}

export default AreaChartComponent;