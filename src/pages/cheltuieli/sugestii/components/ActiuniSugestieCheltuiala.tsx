import React from 'react';
import { SugestieCheltuiala } from '@/types/types.ts';
import { useAuth } from '@/hooks/useAuth.tsx';
import { ButonValideazaSugestieCheltuiala } from '@/pages/cheltuieli/sugestii/components/ButonValideazaSugestieCheltuiala.tsx';

type Props = {
  sugestie?: SugestieCheltuiala;
};

export const ActiuniSugestieCheltuiala: React.FC<Props> = (props) => {
  const { sugestie } = props;
  const { isModerator, isAdmin } = useAuth();

  return (
    <div className="flex gap-1">
      {isModerator || isAdmin ? (
        <>
          <ButonValideazaSugestieCheltuiala sugestie={sugestie} />
        </>
      ) : (
        '-'
      )}
    </div>
  );
};
