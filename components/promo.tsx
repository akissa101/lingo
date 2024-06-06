import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

type PromoProps = {};

export const Promo = ({}: PromoProps) => {
  return (
    <div className="border-2 border-slate-700 rounded-xl p-4 space-y-4 mx-2">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image
            src="/images/unlimited.svg"
            alt="promo"
            width={40}
            height={40}
          />
          <h3 className="text-lg font-bold">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">
          Get unlimited hearts and more...
        </p>
      </div>
      <Button variant="super" size="lg" className="w-full" asChild>
        <Link href="/shop">Upgrade Now</Link>
      </Button>
    </div>
  );
};
