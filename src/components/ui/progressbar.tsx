import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

type ProgressBarProps = {
  mode?: 'determinate' | 'indeterminate';
  progress?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ mode = 'determinate', progress = 50 }) => {
  const width = useMemo(() => {
    if (mode === 'indeterminate') {
      return {
        width: '100%',
      };
    } else {
      return {
        width: `${progress}%`,
      };
    }
  }, [mode, progress]);

  return (
    <div className="bg-neutral w-full overflow-hidden">
      <div
        className={twMerge(
          'h-1.5 overflow-hidden rounded-sm bg-primary',
          mode === 'indeterminate' ? 'indeterminate-progress-bar' : ''
        )}
        style={width}
      />
    </div>
  );
};
