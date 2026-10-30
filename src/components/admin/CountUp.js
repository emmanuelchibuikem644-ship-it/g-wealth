"use client";

import { useState, useEffect } from "react";

export function CountUp({ end, start = 0, duration = 2000, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      setCount(Math.floor(start + (end - start) * percent));
      if (percent < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, start, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}
