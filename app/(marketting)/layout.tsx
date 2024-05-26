import React from 'react';
import { Header } from './header';
import { Footer } from './footer';

type MarkettingLayoutProps = {
  children: React.ReactNode;
};

const MarkettingLayout = ({ children }: MarkettingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarkettingLayout;
