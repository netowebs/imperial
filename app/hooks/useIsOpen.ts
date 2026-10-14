"use client";

import { useEffect, useState } from "react";

type Schedule = {
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
};

const DEFAULT_SCHEDULE: Schedule = {
  openHour: 6,
  openMinute: 30,
  closeHour: 22,
  closeMinute: 0,
};

export function useIsOpen(schedule: Schedule = DEFAULT_SCHEDULE) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const minutesNow = now.getHours() * 60 + now.getMinutes();
      const openAt = schedule.openHour * 60 + schedule.openMinute;
      const closeAt = schedule.closeHour * 60 + schedule.closeMinute;

      setIsOpen(minutesNow >= openAt && minutesNow < closeAt);
    };

    check();
    // Revalida a cada 60 segundos
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, [schedule]);

  return isOpen;
}