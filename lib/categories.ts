export type CategoryId =
  | "productivity"
  | "mindfulness"
  | "wealth"
  | "psychology"
  | "relationships"
  | "purpose"
  | "health"
  | "random";

export interface Category {
  id: CategoryId;
  label: string;
  subtitle: string;
  icon: string;
  focus: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "productivity",
    label: "Productivity & Performance",
    subtitle: "การเติบโต ขบวนการทำงาน และการบริหารพลังงาน",
    icon: "⚡",
    focus:
      "performance, focus, energy, discipline, procrastination, ambition, burnout, work rhythm, decision quality",
  },
  {
    id: "mindfulness",
    label: "Mindfulness & Emotional Awareness",
    subtitle: "สติ การเท่าทันอารมณ์ และการตระหนักรู้ในปัจจุบัน",
    icon: "🌊",
    focus:
      "awareness, emotion, ego, reactivity, presence, inner calm, emotional pattern, self-observation",
  },
  {
    id: "wealth",
    label: "Wealth & Financial Wisdom",
    subtitle: "ปัญญาทางการเงิน ความมั่งคั่ง และ Money Mindset",
    icon: "◈",
    focus:
      "money mindset, wealth behavior, financial fear, greed, delayed gratification, status spending, risk, abundance vs insecurity",
  },
  {
    id: "psychology",
    label: "Psychology & Self-Discovery",
    subtitle: "จิตวิทยา การขุดค้นปมในอดีต และการเข้าใจพฤติกรรมตนเอง",
    icon: "◎",
    focus:
      "hidden motives, childhood pattern, self-sabotage, identity, trauma pattern, shadow self, personality contradiction",
  },
  {
    id: "relationships",
    label: "Deep Relationships & Connection",
    subtitle: "ความสัมพันธ์เชิงลึก ครอบครัว คนรัก และคู่ค้า",
    icon: "◇",
    focus:
      "family, partner, trust, communication, emotional distance, power balance, business partner, loneliness, intimacy, boundaries",
  },
  {
    id: "purpose",
    label: "Purpose, Values & Philosophy",
    subtitle: "เป้าหมายสูงสุด คุณค่าหลักในชีวิต และปรัชญานำทาง",
    icon: "✦",
    focus:
      "meaning, values, mortality, legacy, success, freedom, responsibility, inner compass, philosophical decision-making",
  },
  {
    id: "health",
    label: "Health & Wellness",
    subtitle: "สุขภาพกาย สุขภาพใจ และการเป็นอยู่ที่ดีอย่างยั่งยืน",
    icon: "◉",
    focus:
      "longevity, energy management, sleep, stress physiology, body-mind connection, health behavior, prevention vs treatment, aging well, performance health",
  },
  {
    id: "random",
    label: "Random",
    subtitle: "สุ่มหมวดใดหมวดหนึ่ง",
    icon: "∞",
    focus: "",
  },
];

export const REAL_CATEGORIES = CATEGORIES.filter((c) => c.id !== "random");

export function getCategoryById(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getRandomCategory(): Category {
  return REAL_CATEGORIES[Math.floor(Math.random() * REAL_CATEGORIES.length)];
}
