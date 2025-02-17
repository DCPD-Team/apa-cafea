import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Table } from '@tanstack/react-table';
import { Person } from '@/fake-api/fakePaymentApi';
import { Checkbox } from '@/components/ui/checkbox.tsx';

type Props = {
  table: Table<Person>;
};

export const FiltruColoanePersoane: React.FC<Props> = ({ table }) => {
  const [filters, setFilters] = useState<{ id: string; value: string | boolean }[]>([]);
  const [open, setOpen] = useState(false);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log(filters);
    table.setColumnFilters(filters);
    setOpen(false);
  };

  // Function to update filters
  const updateFilter = (id: string, value: string | boolean) => {
    setFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex((filter) => filter.id === id);

      if (existingFilterIndex !== -1) {
        // Update existing filter
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = { id, value };
        return updatedFilters;
      } else {
        // Add new filter
        return [...prevFilters, { id, value }];
      }
    });
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => setOpen(o)}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtru</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filtru cheltuieli</h4>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="descriere">Nume</Label>
            <Input
              id="nume"
              className="col-span-2 h-8"
              type="text"
              onChange={(e) => updateFilter('nume', e.target.value)}
              placeholder={`Search...`}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="descriere">Prenume</Label>
            <Input
              id="prenume"
              className="col-span-2 h-8"
              type="text"
              onChange={(e) => updateFilter('prenume', e.target.value)}
              placeholder={`Search...`}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="descriere">Participa apǎ:</Label>
            <Checkbox
              onCheckedChange={(checked) => {
                updateFilter('participaApa', checked);
              }}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="descriere">Participa cafea:</Label>
            <Checkbox
              onCheckedChange={(checked) => {
                updateFilter('participaApa', checked);
              }}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Button
              variant={'destructive'}
              className="col-start-2"
              onClick={(event) => {
                event.preventDefault();
                table.resetColumnFilters();
                setFilters([]);
                setOpen(false);
              }}>
              Reseteazǎ
            </Button>
            <Button
              className="col-start-3"
              onClick={(event) => onSubmit(event)}>
              Filtreazǎ
            </Button>
          </div>

          {/*<div className="grid grid-cols-3 items-center gap-4">*/}
          {/*  <Label htmlFor="descriere">Suma de la</Label>*/}
          {/*  <Input*/}
          {/*    id="suma"*/}
          {/*    className="col-span-2 h-8"*/}
          {/*    type="number"*/}
          {/*    onChange={(value) =>*/}
          {/*      table?.getColumn('suma')?.setFilterValue((old: [number, number]) => [value.target.value, old?.[1]])*/}
          {/*    }*/}
          {/*    placeholder={`Min`}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div className="grid grid-cols-3 items-center gap-4">*/}
          {/*  <Label htmlFor="descriere">Suma pana la</Label>*/}
          {/*  <Input*/}
          {/*    id="suma"*/}
          {/*    className="col-span-2 h-8"*/}
          {/*    type="number"*/}
          {/*    onChange={(value) =>*/}
          {/*      table?.getColumn('suma')?.setFilterValue((old: [number, number]) => [old?.[0], value.target.value])*/}
          {/*    }*/}
          {/*    placeholder={`Max...`}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </PopoverContent>
    </Popover>
  );
};
