import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useActiveazaInactiveazaTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/hooks/useActiveazaInactiveazaTipCheltuiala.tsx';
import { ExpenseType } from '@/types/types.ts';
import { Loader2 } from 'lucide-react';
import { FaBan, FaRedo } from 'react-icons/fa';

type Props = {
  expenseType: ExpenseType;
};
export const ButonActiveazaInactiveazaTipCheltuiala: React.FC<Props> = ({ expenseType }) => {
  const { isPending, mutate: sterge } = useActiveazaInactiveazaTipCheltuiala({ tipCheltuiala: expenseType });
  //todo asta e mai shady, nu ar trebui sters tipul de cheltuiala de fapt
  // mai e si fk in o groaza se parti
  // poate ori inactivare ca la persoane, gen cu data inactivare?
  // sau deloc optiunea
  return (
    <Button
      variant={expenseType.active === true ? 'destructive' : 'default'}
      onClick={() => sterge(expenseType)}
      disabled={isPending}>
      {isPending ? <Loader2 className="animate-spin" /> : expenseType.active ? <FaBan /> : <FaRedo />}
      {expenseType.active ? 'Inactiveaza' : 'Activeaza'}
    </Button>
  );
};
