import React from 'react';
import { ExpenseType } from '@/types/types.ts';
import { useAuth } from '@/hooks/useAuth.tsx';
import { ButonAdaugaModificaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/ButonAdaugaModificaTipCheltuiala.tsx';
import { ButonActiveazaInactiveazaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/components/ButonActiveazaInactiveazaTipCheltuiala.tsx';

export const ActiuniTipCheltuiala: React.FC<ExpenseType> = (tipCheltuiala) => {
  const { isModerator, isAdmin } = useAuth();

  return (
    <div className="flex gap-1">
      {isModerator || isAdmin ? (
        <>
          <ButonAdaugaModificaTipCheltuiala expenseType={tipCheltuiala} />
          <ButonActiveazaInactiveazaTipCheltuiala expenseType={tipCheltuiala} />
        </>
      ) : (
        '-'
      )}
    </div>
  );
};
