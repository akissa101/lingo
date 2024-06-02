import { NotebookText } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type UnitBannerProps = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="w-full rounded-xl p-5 bg-green-900 text-white flex items-center justify-between">
      <div className="space-y-2 5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg tracking-wide">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          variant="secondary"
          size="lg"
          className="hidden xl:flex border-2 borer-b-4 active:border-b-2"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};
