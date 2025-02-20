import { FC, useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { FaCoffee } from 'react-icons/fa';
import { FaGlassWater } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';
import { useGetListaPersoanaQuery } from '@/pages/persoane/hooks/useGetListaPersoanaQuery.tsx';
import { useGetListaPlatiQuery } from '@/pages/persoane/hooks/useGetListaPlatiQuery.tsx';

export const SampleComponent: FC = () => {
  const { data: persoane, isLoading, isError, error } = useGetListaPersoanaQuery({});

  const { data: plati } = useGetListaPlatiQuery();

  const queryClient = useQueryClient();

  // const { mutate, isPending } = useMutation<FakeApiResponse, FakeApiResponse, { id: string }>({
  //   mutationFn: (args) => {
  //     return FakePersonApi.update(args.id, {} as unknown as Omit<Person, 'id'>);
  //   },
  //   onError: (response) => {
  //     //toast
  //   },
  //   onSuccess: (response) => {
  //     //toast + close
  //     queryClient.invalidateQueries({
  //       queryKey: ['plati'],
  //     });
  //   },
  //   onSettled: (response) => {},
  // });

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
          {/*<Button onClick={() => mutate({ id: '123' })}>Platesc</Button>*/}
          <Button
            variant={'outline'}
            disabled>
            Nu platesc
          </Button>
        </div>

        <div className={'grid grid-cols-2 gap-2'}>
          <div className={'flex flex-col gap-1'}>
            <h1>Persoane</h1>
            {isError && <div>{error.message}</div>}
            {!isError && isLoading && <div>Se ancarca</div>}
            {!isError &&
              !isLoading &&
              persoane?.map((x) => (
                <div key={x.id}>
                  {x.id} {x.last_name} {x.first_name}
                </div>
              ))}
          </div>
          <div className={'flex flex-col gap-1'}>
            <h1>Plati</h1>
            {plati?.map((x) => <div key={x.id}>{/*{x.id} {x.suma} {x.pentru}*/}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};
