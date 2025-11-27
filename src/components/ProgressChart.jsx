import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ProgressChart = ({ data, targetWeight }) => {
  if (!data || data.length === 0) return <div className="card">No data available</div>;

  // Format data for chart
  const chartData = [...data].reverse().map(log => ({
    date: new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    weight: log.weight
  }));

  const minWeight = Math.min(...chartData.map(d => d.weight), targetWeight) - 1;
  const maxWeight = Math.max(...chartData.map(d => d.weight)) + 1;

  return (
    <div className="card" style={{ height: '300px', padding: '1rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Weight Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--text-muted)" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            domain={[minWeight, maxWeight]} 
            stroke="var(--text-muted)" 
            fontSize={12}
            tickLine={false}
            width={30}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius)'
            }}
          />
          <ReferenceLine y={targetWeight} label="Goal" stroke="var(--secondary)" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="var(--primary)" 
            strokeWidth={3} 
            dot={{ r: 4, fill: 'var(--primary)' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
