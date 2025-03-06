import React from 'react';
import { ExpenseType } from '@/types/types.ts';
import { useAuth } from '@/hooks/useAuth.tsx';
import { ButonAdaugaModificaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/ButonAdaugaModificaTipCheltuiala.tsx';
import { ButonStergeTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/ButonStergeTipCheltuiala.tsx';

export const ActiuniTipCheltuiala: React.FC<ExpenseType> = (tipCheltuiala) => {
  const { user } = useAuth();

  return (
    <div className="flex gap-1">
      {user?.appRole?.includes('moderator') ? (
        <>
          <ButonAdaugaModificaTipCheltuiala expenseType={tipCheltuiala} />
          <ButonStergeTipCheltuiala expenseType={tipCheltuiala} />
        </>
      ) : (
        '-'
      )}
    </div>
  );
};
