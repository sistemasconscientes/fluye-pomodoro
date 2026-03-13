import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronUp, ChevronDown, Plus, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Category = "fix" | "improve" | "new" | "design";

interface Feature {
  id: string;
  title: string;
  category: Category;
  votes: number;
  createdAt: number;
}

const STORAGE_KEY = "fluye_features";
const VOTES_KEY = "fluye_feature_votes";

function loadFeatures(): Feature[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveFeatures(features: Feature[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(features)); }
function getSessionVotes(): Record<string, "up" | "down"> {
  try { return JSON.parse(sessionStorage.getItem(VOTES_KEY) || "{}"); } catch { return {}; }
}
function setSessionVote(featureId: string, direction: "up" | "down") {
  const votes = getSessionVotes(); votes[featureId] = direction; sessionStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

const Features = () => {
  const { t } = useI18n();
  const [features, setFeatures] = useState<Feature[]>(loadFeatures);
  const [sessionVotes, setSessionVotesState] = useState(getSessionVotes);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("improve");
  const [showForm, setShowForm] = useState(false);

  const categoryConfig: Record<Category, { label: string; emoji: string; color: string }> = {
    fix: { label: t("features.fix"), emoji: "🐛", color: "bg-destructive/15 text-destructive" },
    improve: { label: t("features.improve"), emoji: "⚡", color: "bg-accent/15 text-accent-foreground" },
    new: { label: t("features.new"), emoji: "✨", color: "bg-primary/15 text-foreground" },
    design: { label: t("features.design"), emoji: "🎨", color: "bg-secondary text-foreground" },
  };

  const sortedFeatures = useMemo(() => [...features].sort((a, b) => b.votes - a.votes), [features]);

  const addFeature = () => {
    const title = newTitle.trim();
    if (!title) return;
    const feature: Feature = { id: crypto.randomUUID(), title, category: newCategory, votes: 0, createdAt: Date.now() };
    const updated = [...features, feature];
    setFeatures(updated); saveFeatures(updated); setNewTitle(""); setShowForm(false);
  };

  const vote = (featureId: string, direction: "up" | "down") => {
    const existing = sessionVotes[featureId];
    if (existing === direction) return;
    const delta = direction === "up" ? 1 : -1;
    const actualDelta = existing ? delta * 2 : delta;
    const updated = features.map((f) => f.id === featureId ? { ...f, votes: f.votes + actualDelta } : f);
    setFeatures(updated); saveFeatures(updated); setSessionVote(featureId, direction); setSessionVotesState(getSessionVotes());
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-display text-2xl text-foreground">{t("features.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("features.subtitle")}</p>
        </div>
      </div>

      <AnimatePresence>
        {showForm ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
            <div className="rounded-2xl bg-secondary/50 p-5 space-y-3">
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFeature()} placeholder={t("features.placeholder")} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/60" autoFocus />
              <div className="flex gap-2 flex-wrap">
                {(Object.entries(categoryConfig) as [Category, { label: string; emoji: string; color: string }][]).map(([key, config]) => (
                  <button key={key} onClick={() => setNewCategory(key)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${newCategory === key ? `${config.color} ring-2 ring-primary/20` : "bg-background text-muted-foreground border border-border"}`}>
                    <span>{config.emoji}</span>{config.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={addFeature} disabled={!newTitle.trim()} className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40">{t("features.add")}</button>
                <button onClick={() => setShowForm(false)} className="rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/50">{t("features.cancel")}</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowForm(true)} className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
            <Plus size={16} />{t("features.suggest")}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {sortedFeatures.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">{t("features.empty")}</p>
        )}
        {sortedFeatures.map((feature, i) => {
          const config = categoryConfig[feature.category];
          const voted = sessionVotes[feature.id];
          return (
            <motion.div key={feature.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-3">
              <div className="flex flex-col items-center gap-0.5">
                <button onClick={() => vote(feature.id, "up")} className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${voted === "up" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}><ChevronUp size={16} /></button>
                <span className="text-sm font-semibold text-foreground min-w-[20px] text-center">{feature.votes}</span>
                <button onClick={() => vote(feature.id, "down")} className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${voted === "down" ? "bg-destructive text-destructive-foreground" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}><ChevronDown size={16} /></button>
              </div>
              <div className="flex-1 min-w-0"><p className="text-sm text-foreground">{feature.title}</p></div>
              <span className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium shrink-0 ${config.color}`}><Tag size={10} />{config.label}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <p className="text-center text-xs text-muted-foreground">
          {t("footer.createdBy")}{" "}
          <a href="https://sistemasconscientes.com?ref=fluye" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-2 transition-colors hover:text-primary">
            Laboratorio de Sistemas Conscientes
          </a>
        </p>
      </div>
    </div>
  );
};

export default Features;
