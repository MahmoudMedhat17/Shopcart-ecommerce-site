import { Suspense } from "react";
import SuccessFallback from "./SuccessFallback";
import LoadingComponent from "@/src/components/LoadingComponent";

const Page = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <SuccessFallback />
    </Suspense>
  );
};

export default Page;
