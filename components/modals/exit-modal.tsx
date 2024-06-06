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
import { useExitModal } from '@/store/use-exit-modal';

type Props = {};

export const ExitModal = (props: Props) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { open, close, isOpen } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="mex-w-md  bg-slate-900 border-slate-800 shadow-md  shadow-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-center  mb-5">
            <Image
              src="/images/mascot_sad.svg"
              alt="sad"
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Wait, Don&apos;t go!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-base">
          You&apos;r about to leave the lesson. Are you sure?
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="w-full flex flex-col gap-y-4 mt-6">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Keep learning
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                close();
                router.push('/learn');
              }}
            >
              End session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
