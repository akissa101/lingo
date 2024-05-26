type StickyWrapperProps = {
  children: React.ReactNode;
};

export const FeedWrapper = ({ children }: StickyWrapperProps) => {
  return (
    <div className="flex flex-col flex-grow relative  top-0 pb-10">
      {children}
    </div>
  );
};
