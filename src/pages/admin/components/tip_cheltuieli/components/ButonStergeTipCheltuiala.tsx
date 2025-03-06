import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useStergeTipCheltuiala } from '@/pages/admin/components/tip_cheltuieli/hooks/useStergeTipCheltuiala.tsx';
import { ExpenseType } from '@/types/types.ts';
import { Loader2 } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';

type Props = {
  expenseType: ExpenseType;
};
export const ButonStergeTipCheltuiala: React.FC<Props> = ({ expenseType }) => {
  const { isPending, mutate: sterge } = useStergeTipCheltuiala();
  //todo asta e mai shady, nu ar trebui sters tipul de cheltuiala de fapt
  // mai e si fk in o groaza se parti
  // poate ori inactivare ca la persoane, gen cu data inactivare?
  // sau deloc optiunea
  return (
    <Button
      variant={'destructive'}
      onClick={() => sterge(expenseType)}
      disabled={true}>
      {isPending ? <Loader2 className="animate-spin" /> : <FaTrash />}
      Sterge
    </Button>
  );
};
