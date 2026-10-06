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

export interface SceneDownload {
  label: string; // the system, e.g. "Mac"
  detail?: string; // small text after it, e.g. "Apple silicon"
  href: string; // a stable link that always gives the newest file
}

export interface SceneStat {
  value: number | string; // number = animated count-up; string (e.g. "$1B+") = static
  prefix?: string; // e.g. "$" (count-up stats only)
  suffix?: string; // e.g. "%" or "K" (count-up stats only)
  label: string; // the small caption under the number
}

export interface SceneQuote {
  text: string; // VERBATIM. Never reword someone else's words.
  who: string; // attribution, e.g. "David, Software Engineer"
}

export interface SceneImage {
  src: string; // "/images/example.jpg" (file in public/images/)
  alt: string; // description for accessibility
  caption?: string; // optional museum-style label under the image
  wide?: boolean; // true = the figure takes the full row (landscape images)
  video?: string; // "/images/example.mp4": a silent looping clip; src is then its poster
  height?: number; // rem; figures with the same height sit side by side at one height
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
  titleHtml?: string; // overrides title; allows placing <em> exactly (e.g. italic on one word)
  wall?: string; // the small-caps "wall label" under the title
  body?: string | string[]; // one paragraph, or several; <b>...</b> allowed for emphasis
  links?: SceneLink[];
  downloads?: SceneDownload[]; // one button per system, rendered above the links
  stats?: SceneStat[];
  images?: SceneImage[];
  quotes?: SceneQuote[]; // verbatim pull-quotes, rendered small italic serif
  coda?: string; // one quiet closing line at the end of the scene
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
    body: [
      "At Amazon in Amsterdam I worked on Price Perception: how customers see prices. I designed the <b>architecture for a new price-history experience</b>, weighing real-time computation against pre-computed approaches.",
      "I helped expand the <b>European Omnibus directive</b> implementation to Spain and Ireland, ran A/B experiments to measure customer impact, and redesigned a core UI element to work across marketplaces and languages.",
      "I also <b>mentored an intern for five months</b>, and gave a conference talk, <b>The Hidden Power of MCP</b>, to 40+ engineers in Madrid.",
    ],
    stats: [
      { value: "Millions €", label: "in potential EU fines avoided through price-compliance work" },
      { value: 8, label: "marketplaces launched, zero post-launch critical incidents" },
    ],
    quotes: [
      { text: "She's a GenAI champion on our team, suggesting knowledge-base integration, presenting MCP at the Women Conference, and piloting new tools while educating the team about their effectiveness.", who: "Peer feedback, annual review" },
    ],
  },
  {
    id: "paris",
    sky: ["#f2d9a8", "#e5b878"],
    kicker: "2026 to present · Amazon, Paris",
    title: ["Plein", "soleil."],
    wall: "Pricing systems · regional exit · centralized fee engine · AI agents",
    body: [
      "Back in Paris, on pricing systems. As part of a regional-exit program, I moved a backend service off a legacy AWS region with <b>zero downtime</b> and deprecated a legacy data-warehouse cluster, <b>one month ahead of target</b>.",
      "I re-platformed fee computation onto a <b>centralized fee engine</b> and built reusable cross-region networking constructs, so later migrations become configuration changes.",
      "I also brought <b>AI coding agents</b> into our migration work: running them in parallel, piloting new tools, and sharing with my team what actually works.",
    ],
    stats: [
      { value: 82, suffix: "%", label: "region footprint cut, one month ahead of target" },
      { value: 48, prefix: "$", suffix: "K", label: "per year of infrastructure run-rate removed" },
      { value: 26, suffix: "%", label: "per-migration effort cut with AI agents" },
      { value: "$1B+", label: "annual opportunity identified, 3rd place at the hackathon" },
    ],
    quotes: [
      { text: "She didn't just get the migration done quickly and smoothly with zero downtime, she refined our networking setup along the way, and it's been reused in other DARU migrations. She also organized a knowledge-sharing session so others could benefit.", who: "A teammate, Software Engineer" },
    ],
  },
  {
    id: "reflected",
    sky: ["#dcae8e", "#c29275"],
    kicker: "What others say · quoted as written",
    title: ["Reflected", "light."],
    quotes: [
      { text: "This is the kind of backbone I like to see, backed with data, kind but firm. Well done!", who: "My Engineering Manager" },
      { text: "Whether it's leading our Connections meetings or running mob programming sessions, Zoha consistently steps up for the team, and she does it all with a great attitude and care.", who: "A software engineer on my team" },
      { text: "Big shout-out to Zoha for bringing steady, positive energy to the team, even in our most stressful moments!", who: "A teammate" },
    ],
    coda: "Team Cheerleader, two years running.",
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
      { color: "#c99a5b", title: "AI & Agents", body: "Coding agents on production migrations, conference talks on MCP, piloting the tools my team adopts." },
      { color: "#aab3cd", title: "Fullstack & Mobile", body: "React Native, TypeScript, Angular, Supabase. Palette shipped to iOS and Android." },
      { color: "#c2cdd2", title: "Data", body: "SQL, Redshift, Tableau. A predictive retention model, automated reporting pipelines." },
      { color: "#8fb3c9", title: "Games & Graphics", body: "C#, Unity, A* pathfinding, procedural world generation. A shipped tactical RPG." },
      { color: "#cfe3ee", title: "Business & Languages", body: "A business degree across three continents. French, English, Spanish, Urdu, Hindi, Gujarati." },
    ],
  },
  {
    id: "palette",
    sky: ["#2c2620", "#1c1916"],
    dark: true,
    kicker: "2025 to present · nights and weekends",
    title: ["And in the evening,", "I build Palette."],
    titleHtml: "And in the <em>evening,</em><br>I build Palette.",
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
    id: "wall",
    sky: ["#13241f", "#0c1915"],
    dark: true,
    kicker: "2026 · a spare screen on my desk",
    title: ["Night", "light."],
    wall: "Python · open museum APIs · colour matching · Spotify",
    body: [
      "heure bleue is a gallery wall for a spare screen. One painting at a time, from the Met, the Rijksmuseum and the Musée d'Orsay, chosen to match the colours of the album cover playing in Spotify. A clock, the weather, the sunset countdown. Nothing from work.",
      "It keeps what I heart and slowly learns my taste. Everything runs on the machine itself: no accounts, no keys. A web demo shows the wall without the music; the app is free, for Mac, Windows and Linux, and updates itself.",
    ],
    downloads: [
      { label: "Mac", detail: "Apple silicon", href: "https://zoha-rakotomalala.github.io/heure-bleue/get/?os=mac-arm64" },
      { label: "Mac", detail: "Intel", href: "https://zoha-rakotomalala.github.io/heure-bleue/get/?os=mac-intel" },
      { label: "Windows", href: "https://zoha-rakotomalala.github.io/heure-bleue/get/?os=windows" },
      { label: "Linux", href: "https://zoha-rakotomalala.github.io/heure-bleue/get/?os=linux" },
    ],
    images: [
      {
        src: "/images/heure-bleue-portrait.jpg",
        video: "/images/heure-bleue-portrait.mp4",
        alt: "heure bleue on a portrait screen: one painting after another, each in the colours of the song playing",
        caption: "Portrait · seven minutes, eight songs",
        height: 19,
      },
      {
        src: "/images/heure-bleue-landscape.jpg",
        video: "/images/heure-bleue-landscape.mp4",
        alt: "heure bleue on a landscape screen: clock and music on the left, the painting on the right",
        caption: "Landscape · the same wall, wide",
        height: 19,
      },
    ],
    links: [
      { label: "Web demo", href: "https://zoha-rakotomalala.github.io/heure-bleue/" },
      { label: "Repository", href: "https://github.com/zoha-rakotomalala/heure-bleue" },
    ],
  },
  {
    id: "now",
    sky: ["#1a2030", "#12161f"],
    dark: true,
    kicker: "Right now · updated September 2026",
    title: ["Before", "sunrise."],
    body: [
      "I'm exploring how far <b>AI agents</b> can go in real production engineering, and taking my team along for the ride.",
      "Palette has <b>new museums</b> on the way. And somewhere in Paris, there's an exhibition I haven't seen yet.",
    ],
  },
];
