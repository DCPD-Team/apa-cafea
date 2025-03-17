import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart.tsx';
import { PodiumType } from '@/pages/leaderboard/components/Podium.tsx';

export const PodiumChart: React.FC<PodiumType> = (props: PodiumType) => {
  const { locul1, locul2, locul3 } = props;
  const chartData = [
    { name: 'Locul 2', valoare: locul2.valoare, persoana: locul2.nume, color: '#2563eb' },
    { name: 'Locul 1', valoare: locul1.valoare, persoana: locul1.nume, color: '#60a5fa' },
    { name: 'Locul 3', valoare: locul3.valoare, persoana: locul3.nume, color: '#60b5d0' },
  ];

  const chartConfig = {
    locul1: {
      label: 'Locul 1',
      color: '#2563eb',
    },
    locul2: {
      label: 'Locul 2',
      color: '#60a5fa',
    },
    locul3: {
      label: 'Locul 3',
      color: '#60a50a',
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}>
          <XAxis dataKey="name" />
          <YAxis
            padding={{ top: 10 }}
            label={{ value: 'RON', angle: -90, position: 'insideLeft' }}
          />
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="valoare"
            radius={4}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                name={entry.persoana}
              />
            ))}
            <LabelList
              dataKey="persoana"
              position="top"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <div className="flex flex-row gap-4">
        {chartData.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm font-medium">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
