export const profile = {
  name: "ALPASLAN KEMAL PEHLİVANLI",
  location: "Ankara, Turkey",
  email: "kemal.pehlivanli@tigerone.studio",
  linkedin: "linkedin.com/in/alpaslankemal",
  website: "https://www.tigerone.studio/",
};

export const workExperience = [
  {
    company: "TigerOne Studios",
    role: "Co-Founder/Game Designer",
    location: "Ankara, Turkey",
    period: "07/2025–Present",
    bullets: [
      "Delivered 6 playable prototypes in 6 months across PC and mobile under sprint and game jam timelines.",
      "Designed mechanic-first systems with strong core loops, fast onboarding, and scalable progression for PC and mobile.",
      "Structured design docs around interaction clarity, player feedback, and friction analysis across platforms.",
      "Iterated via playtests, refining engagement flow, session pacing, and replay value for short-session gameplay.",
    ],
  },
];

export const achievements = [
  {
    title: "Global Game Jam GGConvention",
    rank: "1ST",
    period: "01/2026 – 02/2026",
    bullets: [
      "Led design of Trick or Admit, an asymmetric psychological deduction game built on evidence-driven dialogue systems.",
      "Developed a structured bluffing mechanic and delivered a complete playable build within 48 hours, ranking 1st locally among 60 teams.",
    ],
    links: [
      { label: "PLAY DEMO", href: "https://globalgamejam.org/games/2026/trick-or-admit-2" },
    ],
  },
  {
    title: "AyazJam 2025",
    rank: "3RD",
    period: "12/2025",
    bullets: [
      "Placed 3rd among 50 teams at AyazJam Game Jam with a narrative-driven courtroom game (TUTSAK).",
      "Designed core game and level mechanics focused on evidence manipulation and player choice.",
    ],
    links: [
      { label: "GAMEPLAY", href: "https://drive.google.com/file/d/19v6xlY8YQ_Qs3_BSc5y-lPItE4TtaV6J/view" },
      { label: "PLAY DEMO", href: "https://fiuby.com/games/tutsak" },
      { label: "TRAILER", href: "https://drive.google.com/file/d/1fyNzq8WzzS_4O_7iytkbRZSmbBNRMkZG/view" },
    ],
  },
  {
    title: "L'Oréal Brandstorm 2025",
    rank: "2ND",
    period: "11/2024 – 05/2025",
    bullets: [
      "Developed an innovative VR-based beauty and care solution.",
      "Placed 2nd among 200 teams in the Istanbul finals, selected as one of the top 4 finalist teams.",
    ],
    links: [],
    centeredBullets: true,
  },
];

export const projects = [
  {
    title: "TUTSAK",
    subtitle: "Narrative Courtroom Puzzle",
    type: "jam" as const,
    jamInfo: { name: "AyazJam 2025", rank: "3RD", period: "12/2025" },
    badges: ["UE5", "Narrative Design", "Level Design", "Systems Design"],
    description:
      "A narrative puzzle game about changing a court verdict. Players edit evidence (photos, recordings, statements) to shift the outcome. Small changes create large narrative consequences.",
    bullets: [
      "Butterfly-effect architecture: small evidential swaps produce large narrative divergences.",
      "Designed core evidence manipulation mechanic and branching consequence logic from scratch.",
      "Structured level design around player-driven reinterpretation of information.",
    ],
    links: [
      { label: "GAMEPLAY", href: "https://drive.google.com/file/d/19v6xlY8YQ_Qs3_BSc5y-lPItE4TtaV6J/view" },
      { label: "PLAY DEMO", href: "https://fiuby.com/games/tutsak" },
      { label: "TRAILER", href: "https://drive.google.com/file/d/1fyNzq8WzzS_4O_7iytkbRZSmbBNRMkZG/view" },
    ],
  },
  {
    title: "TRICK OR ADMIT",
    subtitle: "Identity & Deception System Game",
    type: "jam" as const,
    jamInfo: { name: "Global Game Jam GGConvention", rank: "1ST", period: "01/2026" },
    badges: ["UE5", "Game Systems", "Narrative Design"],
    description:
      "A Halloween deduction game. As a party security guard, the player questions each character and decides who enters. Guests may lie, so spotting contradictions in answers and behavior is the core challenge.",
    bullets: [
      "Tension grows through structured dialogue and evidence validation, with no randomness in the design.",
      "Built the asymmetric identity validation framework and defined suspicion progression rules.",
      "Delivered a complete playable build within 48 hours, ranking 1st locally among 60 teams.",
    ],
    links: [
      { label: "PLAY DEMO", href: "https://globalgamejam.org/games/2026/trick-or-admit-2" },
    ],
  },
  {
    title: "MAGTWINS",
    subtitle: "Asymmetric Co-op Magnetic Puzzle Shooter",
    type: "independent" as const,
    jamInfo: null,
    badges: ["UE5", "Co-op Design", "Puzzle Systems"],
    description:
      "A co-op puzzle game built around magnetic powers. Two players control characters with opposite magnetic forces, using attraction and repulsion to move objects, activate mechanisms, and solve puzzles together.",
    bullets: [
      "Progression demands synchronized spatial reasoning with attraction and repulsion as active verbs.",
      "Authored the polarity rule system and built the interdependent co-op puzzle framework.",
      "Designed for mobile with mechanic-first systems and fast onboarding.",
    ],
    links: [
      { label: "TRAILER", href: "https://youtu.be/3yoQEc8ZdeA?si=O5TWTHybbUXiA5l1" },
    ],
  },
  {
    title: "ILUNIA",
    subtitle: "Co-op Psychological Puzzle",
    type: "independent" as const,
    jamInfo: null,
    badges: ["UE5", "Co-op Design", "Puzzle Systems", "Psychological"],
    description:
      "A co-op psychological puzzle experience where two players see the world in different ways. Each player receives different pieces of information, making communication essential. Players must describe what they see and work together to understand symbols, messages, and environmental clues.",
    bullets: [
      "Asymmetric perception: two players see different realities and must reconcile them.",
      "Information gaps force communication: every symbol and clue must be described aloud.",
      "Mysterious atmosphere built on cooperation, perceptual dissonance, and shared discovery.",
    ],
    links: [
      { label: "GAMEPLAY", href: "https://drive.google.com/file/d/1Q3pJTGQmIhLe-6M33GN-pFGF_WGWgrOr/view?usp=sharing" },
    ],
  },
];

export const education = [
  {
    institution: "Middle East Technical University",
    location: "Ankara, Turkey",
    period: "10/2021–Present",
    degree: "Bachelor's degree, Industrial Engineering, 3rd Grade Student",
  },
];

export const skills = {
  professional: ["Unreal Engine 5", "Game Design", "Level Design", "Systems Design", "KPI", "A/B Testing", "Retention"],
  interests: ["Mobile Games", "Computer Games", "Drums", "Chess", "Fencing", "Travelling", "Football", "Volleyball", "Orienteering"],
  languages: [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "C1" },
    { name: "Chinese", level: "A2, HSK2:180" },
  ],
};
