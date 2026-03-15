import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getMonthlyHistory, getStreak, getMonthlyAverage } from "@/lib/history";

const MonthlyStats = () => {
  const { t } = useI18n();

  const { monthDays, maxCount } = useMemo(() => {
    const days = getMonthlyHistory();
    return { monthDays: days, maxCount: Math.max(...days.map((d) => d.count), 1) };
  }, []);

  const streak = useMemo(() => getStreak(), []);
  const avg = useMemo(() => getMonthlyAverage(), []);
  const totalMonth = useMemo(() => monthDays.reduce((sum, d) => sum + d.count, 0), [monthDays]);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5 space-y-4">
      <h3 className="font-display text-base text-foreground">{t("stats.title")}</h3>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-3">
          <Flame size={18} className="text-accent" />
          <span className="text-lg font-semibold text-foreground">{streak}</span>
          <span className="text-[10px] text-muted-foreground text-center">{t("stats.streak")}</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-3">
          <TrendingUp size={18} className="text-primary" />
          <span className="text-lg font-semibold text-foreground">{avg.toFixed(1)}</span>
          <span className="text-[10px] text-muted-foreground text-center">{t("stats.dailyAvg")}</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-3">
          <Calendar size={18} className="text-primary" />
          <span className="text-lg font-semibold text-foreground">{totalMonth}</span>
          <span className="text-[10px] text-muted-foreground text-center">{t("stats.monthTotal")}</span>
        </div>
      </div>

      {/* Monthly heatmap grid */}
      <div>
        <h4 className="text-xs text-muted-foreground mb-2">{t("stats.last30")}</h4>
        <div className="grid grid-cols-10 gap-1">
          {monthDays.map((day) => {
            const intensity = day.count > 0 ? Math.max(day.count / maxCount, 0.2) : 0;
            return (
              <motion.div
                key={day.date}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                title={`${day.date}: ${day.count}`}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor:
                    day.count > 0
                      ? `hsl(var(--primary) / ${intensity})`
                      : "hsl(var(--border))",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;
