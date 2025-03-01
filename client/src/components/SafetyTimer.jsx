"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, Play, Pause, X } from "lucide-react";

export default function SafetyTimer({ triggerSOS }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(30); // Default to 30 seconds
  const [showSafetyCheck, setShowSafetyCheck] = useState(false);
  const [safetyCheckTimeout, setSafetyCheckTimeout] = useState(null);
  const countdownRef = useRef(null);

  const previousValues = [30, 60, 300, 900, 1800]; // 30s, 1m, 5m, 15m, 30m

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      countdownRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdownRef.current);
            setIsActive(false);
            setShowSafetyCheck(true);

            const timeout = setTimeout(() => {
              console.log("No response detected. Sending alert...");
              triggerSOS("Safety Timer");
              setShowSafetyCheck(false);
            }, 10000); // 1 minute to respond

            setSafetyCheckTimeout(timeout);

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdownRef.current);
    }

    return () => clearInterval(countdownRef.current);
  }, [isActive, isPaused, triggerSOS]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(30);
  };

  const confirmSafety = () => {
    if (safetyCheckTimeout) {
      clearTimeout(safetyCheckTimeout);
      setSafetyCheckTimeout(null);
    }
    setShowSafetyCheck(false);
    resetTimer();
  };

  const setCustomTime = (seconds) => {
    setTime(seconds);
    setIsActive(false);
    setIsPaused(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
        <Clock className="h-5 w-5 mr-2 text-purple-600" />
        Safety Timer
      </h3>

      {showSafetyCheck ? (
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-bold text-lg text-yellow-800 mb-2">Are you safe?</h4>
          <p className="text-yellow-700 mb-4">
            Your timer has ended. Please confirm you're safe or an emergency alert will be sent.
          </p>
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors mb-2"
            onClick={confirmSafety}
          >
            I'm Safe
          </button>
          <p className="text-sm text-yellow-600">Auto-alert will be sent in 60 seconds</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-purple-800">{formatTime(time)}</div>
            <p className="text-sm text-gray-500 mt-1">{isActive ? "Timer running" : "Set timer for safety check"}</p>
          </div>

          <div className="flex justify-center space-x-3 mb-4">
            {!isActive ? (
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                onClick={startTimer}
              >
                <Play className="h-5 w-5" />
              </button>
            ) : (
              <>
                {!isPaused ? (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                    onClick={pauseTimer}
                  >
                    <Pause className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                    onClick={resumeTimer}
                  >
                    <Play className="h-5 w-5" />
                  </button>
                )}

                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                  onClick={resetTimer}
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {previousValues.map((seconds) => (
              <button
                key={seconds}
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 rounded-lg text-sm transition-colors"
                onClick={() => setCustomTime(seconds)}
              >
                {seconds / 60} min
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">Timer will request confirmation when it ends</p>
        </>
      )}
    </div>
  );
}
