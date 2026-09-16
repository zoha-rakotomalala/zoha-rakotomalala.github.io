/**
 * sky.ts — the light engine.
 *
 * 1. Continuously blends the fixed #sky layer between each scene's colors
 *    as you scroll (pure at a scene's center, in motion between centers).
 * 2. Reveals .fx elements as they enter the viewport.
 * 3. Runs the stat count-ups.
 * 4. The easter egg: type "eos" anywhere and the goddess of dawn replays
 *    the whole day for you.
 *
 * ?still=1 disables all motion (used for deterministic screenshots).
 */

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.trim().slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const lerp = (a: RGB, b: RGB, t: number): RGB =>
  a.map((v, i) => Math.round(v + (b[i] - v) * t)) as RGB;
const css = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`;

export function initSky(): void {
  const STILL = new URLSearchParams(location.search).has("still");
  if (STILL) document.documentElement.style.scrollBehavior = "auto";

  const sky = document.getElementById("sky");
  const scenes = [...document.querySelectorAll<HTMLElement>("[data-sky]")];
  if (!sky || scenes.length === 0) return;

  const stops = scenes.map((s) =>
    (s.dataset.sky ?? "").split(",").map(hexToRgb) as [RGB, RGB],
  );

  function paint(): void {
    const mid = innerHeight * 0.5;
    const centers = scenes.map((s) => {
      const r = s.getBoundingClientRect();
      return r.top + r.height / 2;
    });
    let i = 0;
    for (let k = 0; k < centers.length; k++) if (centers[k]! <= mid) i = k;
    const j = Math.min(i + 1, scenes.length - 1);
    let t = j === i ? 0 : (mid - centers[i]!) / (centers[j]! - centers[i]!);
    t = Math.min(1, Math.max(0, t));
    const e = t * t * (3 - 2 * t); // smoothstep: pure at centers, moving between
    sky!.style.setProperty("--sky", css(lerp(stops[i]![0], stops[j]![0], e)));
    sky!.style.setProperty("--sky2", css(lerp(stops[i]![1], stops[j]![1], e)));
  }
  addEventListener("scroll", () => requestAnimationFrame(paint), { passive: true });
  addEventListener("resize", paint);
  paint();

  /* ---- reveals + count-ups ---- */
  const counters = document.querySelectorAll<HTMLElement>("[data-count]");
  const finish = (el: HTMLElement) => {
    el.textContent =
      (el.dataset.prefix ?? "") + el.dataset.count + (el.dataset.suffix ?? "");
  };

  if (STILL) {
    document.querySelectorAll<HTMLElement>(".fx").forEach((el) => {
      el.style.transition = "none";
      el.classList.add("in");
    });
    counters.forEach(finish);
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
      requestAnimationFrame(paint);
    }
    return;
  }

  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.25 },
  );
  document.querySelectorAll(".fx").forEach((el) => io.observe(el));

  const co = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        const el = e.target as HTMLElement;
        const end = Number(el.dataset.count);
        const pre = el.dataset.prefix ?? "";
        const suf = el.dataset.suffix ?? "";
        const t0 = performance.now();
        const D = 1400;
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / D);
          el.textContent = pre + Math.round(end * (1 - Math.pow(1 - t, 3))) + suf;
          if (t < 1) requestAnimationFrame(step);
        };
        step(t0);
      }),
    { threshold: 0.6 },
  );
  counters.forEach((el) => co.observe(el));

  /* ---- the easter egg: type "eos" and the dawn goddess replays the day ---- */
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let typed = "";
  let playing = false;
  addEventListener("keydown", (ev) => {
    const target = ev.target as HTMLElement | null;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
    typed = (typed + ev.key.toLowerCase()).slice(-3);
    if (typed !== "eos" || playing) return;
    playing = true;
    const start = scrollY;
    const total = document.documentElement.scrollHeight - innerHeight;
    const D = 14000; // one full day in fourteen seconds
    const t0 = performance.now();
    document.documentElement.style.scrollBehavior = "auto";
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / D);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      scrollTo(0, start + (total - start) * e);
      if (t < 1 && playing) requestAnimationFrame(step);
      else {
        playing = false;
        document.documentElement.style.scrollBehavior = "";
      }
    };
    requestAnimationFrame(step);
    // any scroll input from the human hands the day back to them
    const cancel = () => {
      playing = false;
      document.documentElement.style.scrollBehavior = "";
      removeEventListener("wheel", cancel);
      removeEventListener("touchstart", cancel);
    };
    addEventListener("wheel", cancel, { passive: true });
    addEventListener("touchstart", cancel, { passive: true });
  });
}
