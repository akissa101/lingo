import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader className="h-12 w-12 text-muted-foreground animate-spin transitioin duration-300" />
    </div>
  );
};

export default Loading;
