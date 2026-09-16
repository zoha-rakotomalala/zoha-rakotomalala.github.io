/**
 * scenes.ts — the content of the whole site lives here.
 *
 * To edit a sentence: change a string.
 * To add a scene: add an object to the array (order = scroll order).
 * To change a scene's light: change its `sky` pair (top color, bottom color).
 * To add links, images, or stats to any scene: fill the optional fields.
 *
 * Images go in /public/images/ and are referenced as "/images/name.jpg".
 */

export interface SceneLink {
  label: string;
  href: string;
}

export interface SceneStat {
  value: number; // the number counted up to
  prefix?: string; // e.g. "$"
  suffix?: string; // e.g. "%" or "K"
  label: string; // the small caption under the number
}

export interface SceneImage {
  src: string; // "/images/example.jpg" (file in public/images/)
  alt: string; // description for accessibility
  caption?: string; // optional museum-style label under the image
}

export interface SpectrumItem {
  color: string; // the dot color (use a color from another scene's sky)
  title: string;
  body: string;
}

export interface Scene {
  id: string; // unique, used for anchors
  sky: [string, string]; // [top, bottom] background colors for this scene
  dark?: boolean; // true = light text on dark sky
  kicker: string; // the small caps line above the title
  title: [string, string]; // [regular part, italic part] of the heading
  wall?: string; // the small-caps "wall label" under the title
  body?: string; // the paragraph
  links?: SceneLink[];
  stats?: SceneStat[];
  images?: SceneImage[];
  spectrum?: SpectrumItem[]; // only used by the Full spectrum scene
}

export const hero = {
  kicker: "Paris · Software Development Engineer at Amazon",
  name: ["Zoha", "Rakotomalala"],
  sub: "Why go straight to the point when you can experience a thousand things during the journey?",
  sky: ["#f4efe6", "#e9e2d2"] as [string, string],
};

export const contact = {
  id: "contact",
  sky: ["#15161d", "#0e0f14"] as [string, string],
  title: "Say hello.",
  body: "Whether you are hiring, building, or just visiting.",
  links: [
    { label: "zoha.rakotomalala@gmail.com", href: "mailto:zoha.rakotomalala@gmail.com" },
    { label: "github.com/zoha-rakotomalala", href: "https://github.com/zoha-rakotomalala" },
    { label: "linkedin.com/in/ZohaRak", href: "https://www.linkedin.com/in/ZohaRak" },
    { label: "CV", href: "/cv" },
  ],
};

export const scenes: Scene[] = [
  {
    id: "prepa",
    sky: ["#dfe6ea", "#cdd8df"],
    kicker: "2017 to 2019 · Lycée Paul Éluard, Saint-Denis and Lycée Saint-Louis, Paris",
    title: ["Première", "lueur."],
    wall: "Prépa MPSI/MP · mathematics · physics · first code",
    body: "Two years of intensive mathematics and physics. Prépa taught me how to work on hard problems. I wrote my first programs here.",
  },
  {
    id: "skies",
    sky: ["#cfe3ee", "#f2e3c4"],
    kicker: "2019 to 2023 · Paris · Seoul · Berkeley",
    title: ["Three", "skies."],
    wall: "GETT triple degree · EDHEC · SKK GSB · Haas School of Business, UC Berkeley",
    body: "One Master, three continents, three countries, three cities. An unforgettable experience, full of travels, discovery and possibilities. A few projects from that time:",
    links: [
      { label: "Mercury's Rise", href: "https://zoharak.itch.io/mercurys-rise" },
      { label: "World generator", href: "https://youtu.be/hIyjMor_EPE" },
    ],
  },
  {
    id: "dataiku",
    sky: ["#c9cede", "#aab3cd"],
    kicker: "2023 · Dataiku, Paris",
    title: ["Heure", "bleue."],
    wall: "First production code · JDBC · Graphviz · Angular",
    body: "My first production code. At Dataiku I built a feature that maps the foreign-key relationships between tables and draws them as interactive graphs.",
    links: [{ label: "Video demo", href: "https://youtu.be/55iVW6ja0eQ" }],
  },
  {
    id: "amsterdam",
    sky: ["#c2cdd2", "#a9b8bf"],
    kicker: "2024 to 2025 · Amazon, Amsterdam",
    title: ["Clair-", "obscur."],
    wall: "Price Perception · architecture · European Omnibus directive",
    body: "At Amazon in Amsterdam I worked on Price Perception: how customers see prices. I designed the architecture for a new price-history experience, weighing real-time computation against pre-computed approaches. I helped expand the European Omnibus directive implementation to Spain and Ireland, ran A/B experiments to measure customer impact, and redesigned a core UI element to work across marketplaces and languages. I supervised an intern for five months, and I gave an internal conference talk on the Model Context Protocol.",
  },
  {
    id: "paris",
    sky: ["#f2d9a8", "#e5b878"],
    kicker: "2026 to present · Amazon, Paris",
    title: ["Plein", "soleil."],
    wall: "Pricing systems · regional exit · centralized fee engine · AI agents",
    body: "Back in Paris, on pricing systems. I delivered a migration workstream in a regional-exit program: four backend services moved off a legacy AWS region, one legacy data-warehouse cluster deprecated, one month ahead of target. I re-platformed fee computation onto a centralized fee engine and built reusable cross-region networking constructs, so later migrations become configuration changes. And I use AI coding agents to run migrations in parallel.",
    stats: [
      { value: 82, suffix: "%", label: "region footprint cut, one month ahead of target" },
      { value: 48, prefix: "$", suffix: "K", label: "per year of infrastructure run-rate removed" },
      { value: 26, suffix: "%", label: "per-migration effort cut with AI agents" },
    ],
  },
  {
    id: "spectrum",
    sky: ["#2a2433", "#1e1a28"],
    dark: true,
    kicker: "The range",
    title: ["Full", "spectrum."],
    body: "My path wasn't a straight line. Each stop added a different skill, and I kept all of them.",
    spectrum: [
      { color: "#f2d9a8", title: "Backend & Cloud", body: "Java, Python, AWS CDK, Lambda, DynamoDB. Pricing systems that serve real marketplaces." },
      { color: "#c99a5b", title: "AI & Agents", body: "AI coding agents in production migration work. A conference talk on the Model Context Protocol." },
      { color: "#aab3cd", title: "Fullstack & Mobile", body: "React Native, TypeScript, Angular, Supabase. Palette shipped to iOS and Android." },
      { color: "#c2cdd2", title: "Data", body: "SQL, Redshift, Tableau. A predictive retention model, automated reporting pipelines." },
      { color: "#8fb3c9", title: "Games & Graphics", body: "C#, Unity, A* pathfinding, procedural world generation. A shipped tactical RPG." },
      { color: "#cfe3ee", title: "Business & Languages", body: "A business degree across three continents. French, English, Spanish, Urdu, Hindi." },
    ],
  },
  {
    id: "palette",
    sky: ["#2c2620", "#1c1916"],
    dark: true,
    kicker: "2025 to present · nights and weekends",
    title: ["And in the evening,", "I build Palette."],
    wall: "React Native · TypeScript · offline-first · museum APIs",
    body: "Palette is a free app to track, curate, and discover art across museums, from the Met to the Rijksmuseum. I build it on nights and weekends. It has its own site, and its own story.",
    images: [
      {
        src: "/images/palette-search.jpg",
        alt: "Palette app search screen showing paintings from museum collections",
        caption: "Search · real museum collections",
      },
      {
        src: "/images/palette-curated.jpg",
        alt: "Palette app showing a curated grid of favorite paintings",
        caption: "Curate · a palette of favorites",
      },
    ],
    links: [
      { label: "Visit Palette", href: "https://zoha-rakotomalala.github.io/Mithra/" },
      { label: "Repository", href: "https://github.com/zoha-rakotomalala/Mithra" },
    ],
  },
  {
    id: "now",
    sky: ["#1a2030", "#12161f"],
    dark: true,
    kicker: "Right now · updated September 2026",
    title: ["Currently", "researching."],
    body: "Agentic development at scale, on real production migrations. Growing Palette museum by museum. And always the next hard problem.",
  },
];
