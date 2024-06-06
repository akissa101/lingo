'use client';

import React, { use, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAudio, useWindowSize, useMount } from 'react-use';
import Image from 'next/image';
import Confetti from 'react-confetti';

import { challengeOptions, challenges, userSubscription } from '@/db/schema';
import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { reduceHearts } from '@/actions/user-progress';
import { Header } from './header';
import { QuestionBubble } from './question-bubble';
import { Challenge } from './challenge';
import { Footer } from './footer';
import { ResultCard } from './result-card';
import { useHeartsModal } from '@/store/use-hearts-modal';
import { usePracticeModal } from '@/store/use-practice-modal';
import { is } from 'drizzle-orm';

type QuizProps = {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscribtion:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
};

export const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscribtion,
}: QuizProps) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex !== -1 ? 0 : uncompletedIndex;
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { width, height } = useWindowSize();
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal, close } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const [lessonId, setLessonId] = useState(initialLessonId);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const [correctAudio, _c, correctControls] = useAudio({
    src: '/audio/correct.wav',
  });
  const [inCorrectAudio, _I, inCorrectControls] = useAudio({
    src: '/audio/incorrect.wav',
  });
  const [finishAudio] = useAudio({
    src: '/audio/finish.ogg',
    autoPlay: true,
  });

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== 'none') return;

    setSelectedOption(id);
    // console.log('status: ', status, selectedOption);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);

    if (!correctOption) return;

    if (correctOption && correctOption.id === selectedOption) {
      console.log('correct option');

      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === 'hearts') {
              openHeartsModal();
              return;
            }
            correctControls.play();

            setStatus('correct');
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialHearts === 100) {
              // Means this is a practise
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch((err) => {
            toast.error('Something went wrong!. Please try again');
          });
      });
    } else {
      console.error('Incorrect option');
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((res) => {
            // console.error('res :', res);
            if (res?.error === 'hearts') {
              openHeartsModal();
              return;
            }

            inCorrectControls.play();
            setStatus('wrong');

            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() =>
            toast.error('Something went wrong. Please try again in reduct-fn')
          );
      });
    }
  };

  console.log('challenge: ', challenge);

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={5000}
          width={width}
          height={height}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full my-20">
          <Image
            src="/images/finish.svg"
            alt="finish"
            className="lg:block hidden bg-slate-800"
            width={100}
            height={100}
          />
          <Image
            src="/images/finish.svg"
            alt="finish"
            className="lg:hidden block  bg-slate-800"
            width={50}
            height={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-slate-300">
            Greet job! You&apos;ve completed the lesson <br />
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard varient="points" value={challenges.length * 10} />
            <ResultCard varient="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push('/learn')}
        />
      </>
    );
  }

  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;

  return (
    <>
      {inCorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={false} //!!userSubscribtion.isActive
      />
      <div className="flex-1 py-8 ">
        <div className="h-full flex items-center jutify-center ">
          <div className="lg:h-[350px] lg:w-[600px] mx-auto w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-slate-300">
              {title}
            </h1>
            <div className="">
              {challenge.type === 'ASSIST' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={isPending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={isPending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
