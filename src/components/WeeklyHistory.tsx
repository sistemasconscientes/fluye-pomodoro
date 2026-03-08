import { useMemo } from "react";
import { motion } from "framer-motion";
import { getWeeklyHistory } from "@/lib/history";

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const WeeklyHistory = () => {
  const days = useMemo(() => getWeeklyHistory(), []);
  const maxCount = Math.max(...days.map((d) => d.count), 1);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5">
      <h3 className="font-display text-base text-foreground mb-3">Últimos 7 días</h3>
      <div className="flex items-end justify-between gap-2 h-24">
        {days.map((day, i) => {
          const date = new Date(day.date + "T12:00:00");
          const dayName = DAY_NAMES[date.getDay()];
          const heightPercent = day.count > 0 ? Math.max((day.count / maxCount) * 100, 12) : 6;
          const isToday = i === days.length - 1;

          return (
            <div key={day.date} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] text-muted-foreground font-medium">
                {day.count > 0 ? day.count : ""}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`w-full max-w-[28px] rounded-t-md ${
                  isToday
                    ? "bg-accent"
                    : day.count > 0
                    ? "bg-primary/70"
                    : "bg-border"
                }`}
              />
              <span
                className={`text-[10px] ${
                  isToday ? "text-accent font-semibold" : "text-muted-foreground"
                }`}
              >
                {dayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyHistory;
