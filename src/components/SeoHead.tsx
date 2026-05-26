import { Helmet } from "react-helmet-async";
import type { DeeplinkAction } from "@/pages/Index";

const SITE = "https://fluye.sistemasconscientes.com";

const META: Record<string, { title: string; description: string; path: string }> = {
  home: {
    title: "Fluye — Pomodoros según tu ritmo",
    description:
      "Pomodoro app que sincroniza tu productividad con tu ciclo hormonal y tu energía diaria. 100% privada y local.",
    path: "/",
  },
  start: {
    title: "Iniciar Pomodoro — Fluye",
    description:
      "Arranca un bloque de enfoque de 25 minutos al instante. Atajo rápido para empezar a fluir.",
    path: "/start",
  },
  phase: {
    title: "Tu fase actual — Fluye",
    description:
      "Consulta tu fase del ciclo menstrual y los pomodoros recomendados según tu energía hormonal.",
    path: "/phase",
  },
  setup: {
    title: "Configurar tu ciclo — Fluye",
    description:
      "Ajusta la duración de tu ciclo y la fecha de tu último periodo para personalizar tus bloques de enfoque.",
    path: "/setup",
  },
  feeling: {
    title: "Registrar energía diaria — Fluye",
    description:
      "Indica cómo te sientes hoy para calibrar tu meta diaria de pomodoros según tu energía real.",
    path: "/feeling",
  },
};

interface Props {
  deeplink?: DeeplinkAction;
}

const SeoHead = ({ deeplink }: Props) => {
  const meta = META[deeplink ?? "home"] ?? META.home;
  const url = `${SITE}${meta.path}`;
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
};

export default SeoHead;