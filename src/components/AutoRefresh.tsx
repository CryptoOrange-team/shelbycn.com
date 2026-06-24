"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function AutoRefresh({ interval = 30 }: { interval?: number }) {
  const router = useRouter();
  const [count, setCount] = useState(interval);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          router.refresh();
          return interval;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [router, interval]);

  return (
    <div className="flex items-center gap-2 text-text3">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,.5)] animate-pulse" />
      <span className="font-mono text-[10px]">{count}s</span>
    </div>
  );
}
