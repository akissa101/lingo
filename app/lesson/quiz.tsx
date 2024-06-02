'use client';

import React, { use, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { challengeOptions, challenges } from '@/db/schema';
import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { reduceHearts } from '@/actions/user-progress';
import { Header } from './header';
import { QuestionBubble } from './question-bubble';
import { Challenge } from './challenge';
import { Footer } from './footer';
import { useAudio } from 'react-use';

type QuizProps = {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscribtion: any;
};

export const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscribtion,
}: QuizProps) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex !== -1 ? 0 : uncompletedIndex;
  });
  const [isPending, startTransition] = useTransition();

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
  const [finishAudio, _F, finishControls] = useAudio({
    src: '/audio/finish.mp3',
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
              console.log('missing hearts');
              toast.error('Missing hearts');
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
            console.error('res :', res);
            if (res?.error === 'hearts') {
              console.error('Missing hearts');
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

  // console.log('status: ', status, selectedOption);

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
