import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Table } from '@tanstack/react-table';
import { SituatiePersoana } from '@/pages/situatie/components/TabelSituatie.tsx';

type Props = {
  table: Table<SituatiePersoana>;
};

// TODO: filtre pe coloanele din situatie
export const FiltruColoaneSituatie: React.FC<Props> = ({ table }) => {
  return (
    <Popover onOpenChange={(open) => (open ? table.resetColumnFilters() : null)}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtru</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filtru cheltuieli</h4>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="descriere">Descriere</Label>
            <Input
              id="descriere"
              className="col-span-2 h-8"
              type="text"
              onChange={(value) => {
                table?.getColumn('descriere')?.setFilterValue(value.target.value);
              }}
              placeholder={`Search...`}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="descriere">Suma de la</Label>
            <Input
              id="suma"
              className="col-span-2 h-8"
              type="number"
              onChange={(value) =>
                table?.getColumn('suma')?.setFilterValue((old: [number, number]) => [value.target.value, old?.[1]])
              }
              placeholder={`Min`}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="descriere">Suma pana la</Label>
            <Input
              id="suma"
              className="col-span-2 h-8"
              type="number"
              onChange={(value) =>
                table?.getColumn('suma')?.setFilterValue((old: [number, number]) => [old?.[0], value.target.value])
              }
              placeholder={`Max...`}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
