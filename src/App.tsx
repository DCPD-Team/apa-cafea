import { FC, useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { FaCoffee } from 'react-icons/fa';
import { FaGlassWater } from 'react-icons/fa6';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { FakePaymentApi, FakePersonApi } from '@/fake-api/fakePaymentApi.ts';

export const App: FC = () => {
  const { data: persoane } = useQuery({
    queryKey: ['persoane'],
    queryFn: () => {
      return FakePersonApi.getAll();
    },
  });

  const { data: plati } = useQuery({
    queryKey: ['plati'],
    queryFn: () => {
      return FakePaymentApi.getAll();
    },
  });

  useEffect(() => {
    console.log('plati', plati);
    console.log('persoane', persoane);
  }, [plati, persoane]);

  return (
    <div className={'flex h-full flex-col'}>
      <div className={'my-auto flex flex-col items-center justify-center gap-4'}>
        <div className={'flex flex-row items-center gap-2'}>
          <FaGlassWater className={'size-12'} />
          <FaCoffee className={'size-16'} />
        </div>
        <h1 className={'text-2xl font-bold'}>Banii de apa si cafea</h1>
        <div className={'flex flex-row gap-2'}>
          <Button>Platesc</Button>
          <Button
            variant={'outline'}
            disabled>
            Nu platesc
          </Button>
        </div>

        <div className={'grid grid-cols-2 gap-2'}>
          <div className={'flex flex-col gap-1'}>
            <h1>Persoane</h1>
            {persoane?.map((x) => (
              <div key={x.id}>
                {x.id} {x.nume} {x.prenume}
              </div>
            ))}
          </div>

          <div className={'flex flex-col gap-1'}>
            <h1>Plati</h1>
            {plati?.map((x) => (
              <div key={x.id}>
                {x.id} {x.suma} {x.pentru}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
