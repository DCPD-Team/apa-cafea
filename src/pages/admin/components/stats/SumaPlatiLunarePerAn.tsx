import React, { useState } from 'react';
import { useGetMonthlyPaymentsByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPaymentsByYear.tsx';
import { useCalculeazaSituatie } from '@/pages/situatie/hooks/useCalculeazaSituatie.tsx';
import { useGetDateSituatie } from '@/pages/situatie/hooks/useGetDateSituatie.tsx';
import { FiltreSituatieType, Luna, LunileAnului } from '@/pages/situatie/components/TabelSituatie.tsx';
import { FiltreSituatie } from '@/pages/situatie/components/FiltreSituatie.tsx';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart.tsx';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

export const monthsChartConfig = {
  IANUARIE: {
    label: 'IANUARIE',
    color: '#2563eb',
  },
  FEBRUARIE: {
    label: 'FEBRUARIE',
    color: '#60a5fa',
  },
  MARTIE: {
    label: 'MARTIE',
    color: '#60a5e2',
  },
  APRILIE: {
    label: 'APRILIE',
    color: '#60a5d2',
  },
  MAI: {
    label: 'MAI',
    color: '#60a5c2',
  },
  IUNIE: {
    label: 'IUNIE',
    color: '#60a5b2',
  },
  IULIE: {
    label: 'IULIE',
    color: '#60a5a2',
  },
  AUGUST: {
    label: 'AUGUST',
    color: '#60a592',
  },
  SEPTEMBRIE: {
    label: 'SEPTEMBRIE',
    color: '#60a582',
  },
  OCTOMBRIE: {
    label: 'OCTOMBRIE',
    color: '#60a572',
  },
  NOIEMBRIE: {
    label: 'NOIEMBRIE',
    color: '#60a562',
  },
  DECEMBRIE: {
    label: 'DECEMBRIE',
    color: '#60a552',
  },
} satisfies ChartConfig;

export const SumaPlatiLunarePerAn: React.FC = () => {
  const [filtre, setFiltre] = useState<FiltreSituatieType>({ an: 2025, expenseTypeId: 'cafea' });
  const { queryPersoane } = useGetDateSituatie();
  const { data: monthlyPayments } = useGetMonthlyPaymentsByYear({
    expenseTypeId: filtre.expenseTypeId,
    an: filtre.an.toString(),
  });

  const situatii = useCalculeazaSituatie({
    ...filtre,
    persoane: queryPersoane.data,
    platiLunare: monthlyPayments,
  });

  const chartData = Object.keys(LunileAnului).map((monthKey) => {
    const total = situatii.reduce((sum, person) => {
      return sum + (person.luni[monthKey as Luna] || 0);
    }, 0);
    const participants = situatii.reduce((sum, person) => {
      return sum + (person.luni[monthKey as Luna] ? 1 : 0);
    }, 0);
    return { month: monthKey, total: total, participants: participants };
  });

  return (
    <Card className={'w-[50%]'}>
      <CardHeader>
        <CardTitle>Valoare plăți efectuate</CardTitle>
        <FiltreSituatie
          filtre={filtre}
          setFiltre={setFiltre}
        />
      </CardHeader>
      <CardContent>
        <div className={'flex flex-col'}>
          <div className="flex flex-col items-center justify-between">
            <ChartContainer
              config={monthsChartConfig}
              className="w-full">
              <BarChart
                accessibilityLayer
                data={chartData}>
                <XAxis
                  dataKey="month"
                  angle={-35}
                  tick={{ fontSize: 10, textAnchor: 'middle' }}
                />
                <YAxis
                  padding={{ top: 10 }}
                  label={{ value: 'RON', angle: -90, position: 'insideLeft' }}
                  name={'RON'}
                />
                <CartesianGrid vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="total"
                  radius={4}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={monthsChartConfig[entry.month as Luna].color}
                    />
                  ))}
                  <LabelList
                    dataKey="total"
                    position="top"
                  />
                </Bar>

                <Bar
                  dataKey="participants"
                  radius={4}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={monthsChartConfig[entry.month as Luna].color}
                      name={entry.month}
                    />
                  ))}
                  <LabelList
                    dataKey="participants"
                    position="top"
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
