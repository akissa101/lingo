import React from 'react';

type LessonLayoutProps = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: LessonLayoutProps) => {
  return (
    <div className="flex flex-col h-ull">
      <div className="h-full w-full flex flex-col">{children}</div>
    </div>
  );
};

export default LessonLayout;
