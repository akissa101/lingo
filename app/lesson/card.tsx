import Image from 'next/image';
import React, { useCallback } from 'react';
import { useAudio, useKey } from 'react-use';

import { cn } from '@/lib/utils';
import { challenges } from '@/db/schema';

type CardProps = {
  id: number;
  text: string;
  imageSrc?: string | null;
  shortCut: string;
  selected?: boolean;
  onClick: () => void;
  status: 'correct' | 'wrong' | 'none';
  audioSrc?: string | null;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)['type'];
};

export const Card = ({
  id,
  text,
  imageSrc,
  audioSrc,
  shortCut,
  selected,
  status,
  onClick,
  disabled,
  type,
}: CardProps) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || '' });

  const handleClick = useCallback(() => {
    if (disabled) return;

    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortCut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'h-full border-2 border-slate-700 rounded-xl border-b-4 hover:bg-slate-800 p-4 lg:p-6 cursor-pointer active:border-b-2 transition duration-300',
        selected && 'border-sky-800 hover:bg-sky-900',
        selected &&
          status === 'correct' &&
          'border-green-600 bg-green-800/80 hover:bg-green-800/90',
        selected &&
          status === 'wrong' &&
          'border-rose-600 bg-rose-800/80 hover:bg-rose-800/90',
        disabled && 'cursor-pointer-none bg-transparent',
        type === 'ASSIST' && 'lg:p-3 w-full'
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          {<Image src={imageSrc} alt={text} fill className="" />}
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-between w-full',
          type === 'ASSIST' && 'flex-row-reverse'
        )}
      >
        {type === 'ASSIST' && <div />}
        <p
          className={cn(
            ' w-full text-slate-300 text-lg lg:text-xl font-bold',
            selected && 'text-indigo-400',
            selected && status === 'correct' && 'text-green-300',
            selected && status === 'wrong' && 'text-rose-300'
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            'lg:h-[30px] lg:w-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-xs lg:text-base font-semibold',
            selected && 'border-indigo-800 text-indigo-400',
            selected &&
              status === 'correct' &&
              'text-green-300 border-green-400',
            selected && status === 'wrong' && 'text-rose-300 border-rose-200'
          )}
        >
          {shortCut}
        </div>
      </div>
    </div>
  );
};
