import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#087a11', '#94931d', '#e40808', '#d800e6', '#46ffcf', '#ffe67b'];

interface ChartData {
  name: string;
  value: number;
}

interface PiChartsProps {
  data: ChartData[];
  totalValue: number;
}

const PiCharts: React.FC<PiChartsProps> = ({ data, totalValue }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry: ChartData, index: number) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index % COLORS.length]} 
          />
        ))}
      </Pie>
      <Tooltip
        content={({ payload }) => {
          if (payload?.[0]) {
            const { name, value } = payload[0].payload as ChartData;
            const percentage = ((value / totalValue) * 100).toFixed(2);
            return (
              <div className="tooltip-style">
                {`${name}: ${value}$ (${percentage}%)`}
              </div>
            );
          }
          return null;
        }}
      />
    </PieChart>
  );
};

export default PiCharts;