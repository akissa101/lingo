import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

type Props = {};

export const Footer = (props: Props) => {
  return (
    <footer className="hidden lg:block  h-20 w-full border-t-2  border-slate-700">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full gap-4">
        <Button variant="ghost" className="w-32 ">
          <Image
            src="/flags/fr.svg"
            alt="FrFlag"
            height={28}
            width={46}
            className="mr-4 rounded-xl"
          />
          <span className="px-2">French</span>
        </Button>
        <Button variant="ghost" className="w-32 ">
          <Image
            src="/flags/ie.svg"
            alt="ItalyFlag"
            height={28}
            width={46}
            className="mr-4 rounded-2xl"
          />
          <span className="px-3">Italic</span>
        </Button>
        <Button variant="ghost" className="w-32 ">
          <Image
            src="/flags/sa.svg"
            alt="SaudiFlag"
            height={28}
            width={46}
            className="mr-4 rounded-xl"
          />
          <span className="px-2">Arabic</span>
        </Button>
      </div>
    </footer>
  );
};
