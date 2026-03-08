import { whyUsData } from "@/src/constants/data";
import { Title, SubText, SubTitle } from "@/src/components/Text";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Check } from "lucide-react";

const Reasons = () => {
  return (
    <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center place-items-center gap-4 sm:gap-6 bg-shopLighterBg border rounded-lg shadow-2xl p-7 w-full">
      {whyUsData.map((reason) => (
        <Dialog key={reason.title}>
          <DialogTrigger asChild>
            <div
              className="w-full group"
              style={
                {
                  "--color-whyUsIconsColor": reason.color,
                } as React.CSSProperties
              }
            >
              <div className="bg-white p-4 h-80 w-full flex flex-col items-center justify-center rounded-lg space-y-4 shadow-lg group-hover:shadow-3xl group-hover:border group-hover:border-shop-light-green hoverEffect transform origin-top group-hover:-translate-y-2 group-hover:shadow-xl cursor-pointer">
                <div className="bg-gray-100 rounded-lg flex justify-center items-center w-fit p-3 group-hover:scale-105 hoverEffect">
                  {reason.icon}
                </div>
                <SubTitle className="text-lg text-center text-darkColor group-hover:text-shop-dark-green hoverEffect">
                  {reason.title}
                </SubTitle>
                <SubText className="text-base text-center">
                  {reason.desc}
                </SubText>
                <div className="text-gray-600 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 hoverEffect">
                  <div
                    className={`w-2 h-2 rounded-full bg-(--color-whyUsIconsColor)`}
                  />
                  Click to learn more
                </div>

                <div className="bg-gray-300 w-full h-2 rounded-full">
                  <div
                    className={`w-1/2 bg-linear-to-r from-(--color-whyUsIconsColor) to-(--color-whyUsIconsColor) h-2 rounded-full`}
                  />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto max-h-175">
            <DialogHeader className="bg-linear-to-br from-shop-light-bg via-shop-light-pink to-shop-light-green sticky top-0 left-0 w-full">
              <DialogTitle className="flex items-center gap-4 p-6">
                <div className="bg-blue-50 rounded-lg flex justify-center items-center w-fit p-5 group-hover:scale-105 hoverEffect">
                  {reason.icon}
                </div>
                <div className="space-y-2">
                  <Title className="text-darkColor text-3xl">
                    {reason.title}
                  </Title>
                  <SubTitle className="text-darkColor font-medium">
                    {reason.desc}
                  </SubTitle>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="pb-0 pl-6 pr-6 pt-6 flex items-start gap-3">
              <div
                className={`h-8 w-2 bg-(--color-whyUsIconsColor) rounded-full`}
                style={
                  {
                    "--color-whyUsIconsColor": reason.color,
                  } as React.CSSProperties
                }
              />
              <SubTitle className="text-2xl font-bold text-darkColor">
                How it works
              </SubTitle>
            </div>
            {Object.values(reason.howItWorks[0]).map((statement, index) => (
              <div key={index} className="pb-4 pl-4 pr-4 pt-0">
                <div className="p-4 flex items-start gap-4 border rounded-lg hover:border-shop-light-green hoverEffect bg-linear-to-r from-shopLighterBg via-shop-light-bg to-white cursor-pointer hover:shadow-lg">
                  <span
                    className={`w-4 h-4 rounded-full p-3 flex items-center justify-center bg-(--color-whyUsIconsColor) text-white text-sm font-bold`}
                    style={
                      {
                        "--color-whyUsIconsColor": reason.color,
                      } as React.CSSProperties
                    }
                  >
                    {index + 1}
                  </span>
                  <p className="text-lg text-shopLightText">{statement}</p>
                </div>
              </div>
            ))}

            <div className="pb-0 pl-6 pr-6 pt-6 flex items-start gap-3">
              <div
                className={`h-8 w-2 bg-(--color-whyUsIconsColor) rounded-full`}
                style={
                  {
                    "--color-whyUsIconsColor": reason.color,
                  } as React.CSSProperties
                }
              />
              <SubTitle className="text-2xl font-bold text-darkColor">
                Benefits For You
              </SubTitle>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 pr-6 pl-6 pt-0">
              {Object.values(reason.benefits[0]).map((statement, index) => (
                <div
                  key={index}
                  className="p-4 flex items-start gap-4 border rounded-lg hover:border-shop-light-green hoverEffect bg-linear-to-r from-shopLighterBg via-shop-light-bg to-white cursor-pointer hover:shadow-lg"
                >
                  <Check color="#1760f2" />
                  <p className="text-lg text-shopLightText">{statement}</p>
                </div>
              ))}
            </div>
            <DialogFooter className="px-2 py-4 bg-shop-light-bg border-t border-shop-light-bg sticky bottom-0 left-0 w-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-shop-light-green animate-pulse" />
                <p className="text-shopLightText">
                  Your satisfaction is our priority
                </p>
              </div>
              <DialogClose className="bg-linear-to-r from-shop-dark-green to-shop-orange hover:bg-linea-to-r hover:from-shop-orange hover:to-shop-dark-green hoverEffect text-shop-light-bg/80 font-semibold px-6 py-2 rounded-full">
                Got it, thanks!
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default Reasons;
