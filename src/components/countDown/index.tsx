import { useState, useEffect, useCallback } from "react";

interface ICountdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountDown = ({ hours = 0, minutes = 0, seconds = 60 }: ICountdown) => {
  const [time, setTime] = useState<ICountdown>({ hours, minutes, seconds });

  const reset = useCallback(() => {
    setTime({
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds,
    });
  }, [time.hours, time.minutes, time.seconds]);

  const tick = useCallback(() => {
    if (time.hours === 0 && time.minutes && time.seconds === 0) {
      reset();
    } else if (time.hours === 0 && time.seconds === 0) {
      setTime({ hours: time.hours - 1, minutes: 59, seconds: 59 });
    } else if (time.seconds === 0) {
      setTime({ hours: time.hours, minutes: time.minutes - 1, seconds: 59 });
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
    }
  }, [time.hours, time.minutes, time.seconds, reset]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [time, tick]);

  return (
    <div>
      <div className="flex justify-center items-center font-semibold gap-2 my-4">
        <div className="text-center flex flex-col justify-center items-center">
          <h1 className="px-4 py-1 bg-mainGray text-[black]  text-2xl mx-1 bg-gray-200 rounded-md">{`${time.hours
            .toString()
            .padStart(2, "0")}`}</h1>
          <h1 className="text-sm mt-2">Giờ</h1>
        </div>
        <span className="mb-7">:</span>
        <div className="text-center flex flex-col justify-center items-center">
          <h1 className="px-4 py-1 bg-mainGray text-[black]  text-2xl mx-1 bg-gray-200 rounded-md">{`${time.minutes
            .toString()
            .padStart(2, "0")}`}</h1>
          <h1 className="text-sm mt-2">Phút</h1>
        </div>
        <span className="mb-7">:</span>
        <div className="text-center flex flex-col justify-center items-center">
          <h1 className="px-4 py-1 bg-mainGray text-[black] text-2xl mx-1 bg-gray-200 rounded-md">{`${time.seconds
            .toString()
            .padStart(2, "0")}`}</h1>
          <h1 className="text-sm mt-2">Giây</h1>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
