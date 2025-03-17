import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetMonthlyPricesByYear } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPricesByYear.tsx';
import { FiltrePretLunarType } from '@/pages/admin/components/preturi_lunare/components/TabelPreturiLunare.tsx';
import { FiltrePreturiLunare } from '@/pages/admin/components/preturi_lunare/components/FiltrePreturiLunare.tsx';
import { LunileAnului } from '@/pages/situatie/components/TabelSituatie.tsx';

export const EvolutiePreturiLunarePerExpenseType: React.FC = () => {
  const [filtre, setFiltre] = useState<FiltrePretLunarType>({ an: 2025, expenseTypeId: 'cafea' });
  const { data } = useGetMonthlyPricesByYear({ year: filtre.an });

  const filteredData = (data || []).filter((value) => {
    return value.expense_type_id === filtre.expenseTypeId;
  });

  const chartData = Object.keys(LunileAnului).map((monthKey) => {
    const total = filteredData.find((x) => x.month_id === monthKey);
    return { month: monthKey, value: total ? total.price_value : 0 };
  });

  return (
    <Card className={'w-[50%]'}>
      <CardHeader>
        <CardTitle>Evoluție prețuri lunare</CardTitle>
        <FiltrePreturiLunare
          setFiltre={setFiltre}
          filtre={filtre}
        />
      </CardHeader>
      <CardContent className={'h-400'}>
        <div className={'flex flex-col gap-3'}>
          <div className="flex flex-col items-center justify-between">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minHeight={400}>
              <AreaChart
                data={chartData}
                width={500}
                height={400}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <XAxis
                  dataKey="month"
                  type={'category'}
                  angle={-35}
                  tick={{ fontSize: 10, textAnchor: 'middle', strokeWidth: 0.5 }}
                  interval="preserveEnd"
                />
                <YAxis label={{ value: 'RON', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Area
                  width={5}
                  dot={{ stroke: 'blue', strokeWidth: 2 }}
                  activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }}
                  dataKey={'value'}
                  legendType={'square'}
                  type="monotone"
                  stroke="#8884d8"
                  fill="#8884d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
