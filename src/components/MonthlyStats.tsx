import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Calendar, Clock, Trophy, Target, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getMonthlyHistory, getStreak, getMonthlyAverage } from "@/lib/history";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatCardProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  tooltip: string;
}

const StatCard = ({ icon, value, label, tooltip }: StatCardProps) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-3 cursor-help relative group">
          {icon}
          <span className="text-lg font-semibold text-foreground">{value}</span>
          <span className="text-[10px] text-muted-foreground text-center leading-tight">{label}</span>
          <Info size={10} className="absolute top-1.5 right-1.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px] text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MonthlyStats = () => {
  const { t } = useI18n();

  const { monthDays, maxCount } = useMemo(() => {
    const days = getMonthlyHistory();
    return { monthDays: days, maxCount: Math.max(...days.map((d) => d.count), 1) };
  }, []);

  const streak = useMemo(() => getStreak(), []);
  const avg = useMemo(() => getMonthlyAverage(), []);
  const totalMonth = useMemo(() => monthDays.reduce((sum, d) => sum + d.count, 0), [monthDays]);
  const focusHours = useMemo(() => ((totalMonth * 25) / 60), [totalMonth]);
  const bestDay = useMemo(() => {
    const best = monthDays.reduce((max, d) => d.count > max.count ? d : max, monthDays[0]);
    return best?.count || 0;
  }, [monthDays]);
  const activeDays = useMemo(() => monthDays.filter((d) => d.count > 0).length, [monthDays]);

  return (
    <div className="rounded-2xl bg-secondary/50 p-5 space-y-4">
      <h3 className="font-display text-base text-foreground">{t("stats.title")}</h3>

      <div className="grid grid-cols-3 gap-2">
        <StatCard
          icon={<Flame size={16} className="text-accent" />}
          value={streak}
          label={t("stats.streak")}
          tooltip={t("stats.tooltip.streak")}
        />
        <StatCard
          icon={<TrendingUp size={16} className="text-primary" />}
          value={avg.toFixed(1)}
          label={t("stats.dailyAvg")}
          tooltip={t("stats.tooltip.dailyAvg")}
        />
        <StatCard
          icon={<Calendar size={16} className="text-primary" />}
          value={totalMonth}
          label={t("stats.monthTotal")}
          tooltip={t("stats.tooltip.monthTotal")}
        />
        <StatCard
          icon={<Clock size={16} className="text-accent" />}
          value={<>{focusHours.toFixed(1)}<span className="text-xs font-normal">h</span></>}
          label={t("stats.focusHours")}
          tooltip={t("stats.tooltip.focusHours")}
        />
        <StatCard
          icon={<Trophy size={16} className="text-primary" />}
          value={bestDay}
          label={t("stats.bestDay")}
          tooltip={t("stats.tooltip.bestDay")}
        />
        <StatCard
          icon={<Target size={16} className="text-primary" />}
          value={<>{activeDays}<span className="text-xs font-normal">/30</span></>}
          label={t("stats.activeDays")}
          tooltip={t("stats.tooltip.activeDays")}
        />
      </div>

      {/* Monthly heatmap grid */}
      <div>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <h4 className="text-xs text-muted-foreground mb-2 cursor-help inline-flex items-center gap-1">
                {t("stats.last30")}
                <Info size={10} className="text-muted-foreground/40" />
              </h4>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px] text-xs">
              {t("stats.tooltip.heatmap")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
