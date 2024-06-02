import Image from 'next/image';
import React from 'react';

type QuestionBubbleProps = {
  question: string;
};

export const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/images/mascot.svg"
        alt="mascot"
        height={60}
        width={60}
        className="bg-green-800 rounded-lg hidden lg:block"
      />
      <Image
        src="/images/mascot.svg"
        alt="mascot"
        height={40}
        width={40}
        className="bg-green-800 rounded-lg lg:hidden"
      />
      <div className="relative py-2 px-4 border-2 border-slate-700 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 tranform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};
