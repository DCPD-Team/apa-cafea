import React from 'react';
import { ExpenseType } from '@/types/types.ts';
import { useAuth } from '@/hooks/useAuth.tsx';
import { ButonAdaugaModificaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/ButonAdaugaModificaTipCheltuiala.tsx';

export const ActiuniTipCheltuiala: React.FC<ExpenseType> = (tipCheltuiala) => {
  const { user } = useAuth();

  return (
    <div className="flex gap-1">
      {user?.appRole?.includes('moderator') ? (
        <>
          <ButonAdaugaModificaTipCheltuiala expenseType={tipCheltuiala} />
        </>
      ) : (
        '-'
      )}
    </div>
  );
};
