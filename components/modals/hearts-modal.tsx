'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useHeartsModal } from '@/store/use-hearts-modal';

type Props = {};

export const HeartsModal = (props: Props) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { open, close, isOpen } = useHeartsModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const onClick = () => {
    close();
    router.push('/shop');
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="mex-w-md  bg-slate-900 border-slate-800 shadow-md  shadow-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-center  mb-5">
            <Image
              src="/images/mascot_bad.svg"
              alt="sad"
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            You are out of hearts!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-base">
          Go Pro for unlimited hearts or purchase them in the store
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="w-full flex flex-col gap-y-4 mt-6">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>
            <Button
              variant="primaryOutline"
              className="w-full"
              size="lg"
              onClick={close}
            >
              No, thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
