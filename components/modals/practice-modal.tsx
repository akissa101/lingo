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
import { usePracticeModal } from '@/store/use-practice-modal';

type Props = {};

export const PracticeModal = (props: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { open, close, isOpen } = usePracticeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="mex-w-md  bg-slate-900 border-slate-800 shadow-md  shadow-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-center  mb-5">
            <Image
              src="/images/heart.svg"
              alt="hearts"
              width={100}
              height={100}
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Practice Lesson
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-base">
          Use practice lesson to regain hearts and points. You&apos;ll loose
          hearts and points in practice lessons
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="w-full flex flex-col gap-y-4 mt-6">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
