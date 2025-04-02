import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FaEdit } from 'react-icons/fa';
import { MonthlyPayments } from '@/types/types.ts';
import { FormularModificaPlataLunaraPersoana } from '@/pages/persoane/detalii/plati_lunare/components/FormularModificaPlataLunaraPersoana.tsx';
import { useGetMonthlyPrice } from '@/pages/persoane/detalii/plati_lunare/hooks/useGetMonthlyPrice.tsx';
import { useGetActiveExpenseTypes } from '@/pages/persoane/hooks/useGetActiveExpenseTypes.tsx';

type Props = {
  statusLuna: MonthlyPayments;
  targetYear: number;
  expenseTypeId: string;
};

export const ActiuniPlataLunara: React.FC<Props> = ({ statusLuna, targetYear, expenseTypeId }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useGetMonthlyPrice({
    expenseTypeId: expenseTypeId,
    monthId: statusLuna.month_id,
    year: targetYear,
  });
  const { data: expenses } = useGetActiveExpenseTypes();
  const isActive = expenses?.find((x) => x.id === expenseTypeId);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          disabled={!data || isLoading || isError || !isActive}>
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{'Modifică status lunar persoană'} </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-justify text-xs">
          Poti marca daca persoana este activa sau nu pentru luna in cauza. Abia dupa ce este marcata ca activa, poti
          schimba statusul achitarii platii. Daca tipul de cheltuiala nu este activ sau daca persoana nu are buget
          disponibil pentru tipul de cheltuiala selectat, nu vei putea marca plata drept achitata.
        </DialogDescription>
        <FormularModificaPlataLunaraPersoana
          close={() => setOpen(false)}
          statusLunar={statusLuna}
          expenseTypeId={expenseTypeId}
          targetYear={targetYear}
        />
      </DialogContent>
    </Dialog>
  );
};
