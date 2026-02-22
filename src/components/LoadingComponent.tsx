import { Loader2 } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="bg-gray-100 min-h-80 w-full py-12 flex justify-center items-center">
      <div className="flex items-center gap-4">
        <Loader2 className="animate-spin w-5 h-5 text-blue-500" />
        <span className="text-blue-500 font-medium text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingComponent;
