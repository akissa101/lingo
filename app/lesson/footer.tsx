import React from 'react';
import { useKey, useMedia } from 'react-use';
import { CheckCircle, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type FooterProps = {
  disabled?: boolean;
  lessonId?: number | string;
  status: 'correct' | 'wrong' | 'none' | 'completed';
  onCheck: () => void;
};

export const Footer = ({
  status,
  disabled,
  onCheck,
  lessonId,
}: FooterProps) => {
  const isMoblie = useMedia('max-width:1140px');
  useKey('enter', onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        'h-[0px] lg:h-[120px]  border-t-2 border-slate-700 pt-8 lg:pt-0',
        status === 'correct' &&
          'border border-t-8 border-green-700/95 rounded-xl',
        status === 'wrong' && 'border border-t-8 border-rose-700/95 rounded-xl'
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto gap-x-3 flex items-center justify-between px-6 lg:px-12 ">
        {status === 'correct' && (
          <div className="text-green-600 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 lg:mr-4 mr-4" />
            Well Done!
          </div>
        )}
        {status === 'wrong' && (
          <div className="text-rose-600 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 lg:mr-4 mr-4" />
            Try Again
          </div>
        )}
        {status === 'completed' && (
          <Button
            size={isMoblie ? 'sm' : 'lg'}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-blue-200"
          >
            Practice Again
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          size={isMoblie ? 'sm' : 'lg'}
          onClick={onCheck}
          variant={status === 'wrong' ? 'danger' : 'secondary'}
        >
          {status === 'none' && 'Check'}
          {status === 'correct' && 'Next'}
          {status === 'wrong' && 'Try again'}
          {status === 'completed' && 'Continue'}
        </Button>
      </div>
    </footer>
  );
};
