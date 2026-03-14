"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Clock3 } from "lucide-react";

dayjs.extend(duration);

// This initialTimer var is for how the time i want to be shown.
const initialTimer = dayjs
  .duration({
    days: 2,
    hours: 14,
    minutes: 50,
    seconds: 40,
  })
  .asSeconds();

const Dealstimer = () => {
  const [timerLeft, setTimerLeft] = useState<number>(initialTimer);

  // useEffect that is triggered with every render that contains the setInterval which triggers the timer of the deal.
  useEffect(() => {
    // Here we set the interval and the set the state of the timerLeft state with how the time want to be calculated or decreased -> if prev exists then prev - 1 means decrease the number by 1 second. If not exists then number is 0. and the interval is decreased by 1 second only "1000 ms".
    const timerInterval = setInterval(() => {
      setTimerLeft((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    // Here we clean the time interval to avoid memory leaking.
    return () => clearInterval(timerInterval);
  }, []);

  // converts our "pile of seconds" back into a Day.js object
  const currentDuration = dayjs.duration(timerLeft, "seconds");

  // Ensure that if the seconds are 5 for example then display it as "05" instead of "5".
  const formatUnit = (value: number) =>
    String(Math.floor(value)).padStart(2, "0");

  return (
    <div className="flex items-center flex-wrap lg:flex-nowrap gap-3 bg-white/20 w-fit p-4 md:p-8 rounded-lg">
      <div className="flex items-center gap-3">
        <Clock3 className="text-red-600" />
        <p className="text-red-600 font-semibold text-base md:text-lg">
          Deal Ends In:
        </p>
      </div>

      <div className="bg-white text-shop-dark-green p-2 md:p-4 rounded-lg flex flex-col items-center justify-center">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          {formatUnit(currentDuration.asDays())}
        </div>
        <small>Days</small>
      </div>

      <div className="bg-white text-shop-dark-green  p-2 md:p-4 rounded-lg flex flex-col items-center justify-center">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          {formatUnit(currentDuration.hours())}
        </div>
        <small>Hours</small>
      </div>

      <div className="bg-white text-shop-dark-green p-2 md:p-4 rounded-lg flex flex-col items-center justify-center">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          {formatUnit(currentDuration.minutes())}
        </div>
        <small>Mins</small>
      </div>

      <div className="bg-white text-shop-dark-green p-2 md:p-4 rounded-lg flex flex-col items-center justify-center">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          {formatUnit(currentDuration.seconds())}
        </div>
        <small>Secs</small>
      </div>
    </div>
  );
};

export default Dealstimer;
