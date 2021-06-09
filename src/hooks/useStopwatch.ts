import React, { useState, useEffect } from "react";

const useTimer = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setElapsedTime((prev) => prev + 1.0), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
  };
};

export const useStopwatch = () => {
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer();
  return {
    elapsedTime,
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    isRunning,
  };
};
