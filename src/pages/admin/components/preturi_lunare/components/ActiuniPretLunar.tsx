import React from 'react';
import { MonthlyPrices } from '@/types/types.ts';
import { ButonAdaugaModificaPretLunar } from '@/pages/admin/components/preturi_lunare/components/ButonAdaugaModificaPretLunar.tsx';
import { useAuth } from '@/hooks/useAuth.tsx';

type Props = {
  monthlyPrice: MonthlyPrices;
};

export const ActiuniPretLunar: React.FC<Props> = ({ monthlyPrice }) => {
  const { isModerator } = useAuth();

  return (
    <div className="flex gap-1">
      {isModerator ? (
        <>
          <ButonAdaugaModificaPretLunar monthlyPrice={monthlyPrice} />
        </>
      ) : (
        '-'
      )}
    </div>
  );
};
