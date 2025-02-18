import { ProgressBar } from '@/components/ui/progressbar.tsx';

type Props = {
  isFetching: boolean;
  colSpan: number;
};

export const LoadingBarTable: React.FC<Props> = ({ isFetching, colSpan }) => {
  return (
    <tr>
      <td
        className={'h-2.5 border-b'}
        colSpan={colSpan}>
        {isFetching && <ProgressBar mode={'indeterminate'} />}
      </td>
    </tr>
  );
};
