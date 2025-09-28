"use client";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-11-12T00:00:00+05:30");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { weeks, days, hours, minutes };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <div className="px-8 py-4 bg-black/25 rounded-2xl border border-blue-300">
        <span className="text-white text-xl font-bold font-mono">{timeLeft.weeks} Weeks</span>
      </div>
      <div className="px-8 py-4 bg-black/25 rounded-2xl border border-blue-300">
        <span className="text-white text-xl font-bold font-mono">{timeLeft.days} Days</span>
      </div>
      <div className="px-8 py-4 bg-black/25 rounded-2xl border border-blue-300">
        <span className="text-white text-xl font-bold font-mono">{timeLeft.hours} hours</span>
      </div>
      <div className="px-8 py-4 bg-black/25 rounded-2xl border border-blue-300">
        <span className="text-white text-xl font-bold font-mono">{timeLeft.minutes} minutes</span>
      </div>
    </div>
  );
}
