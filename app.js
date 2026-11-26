/* ==================================================================
   HAVE A NICE PIZZA — interakcje (bez bibliotek)
   Każda animacja ma powód: wejście hero buduje apetyt w 1,2 s,
   reszta tylko prowadzi oko i nie przeszkadza w zamawianiu.
   ================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  /* ---------- Godziny: codziennie 12:00–22:00 (czas warszawski) ---------- */
  const OPEN = 12 * 60, CLOSE = 22 * 60;
  function warsawMinutes() {
    try {
      const parts = new Intl.DateTimeFormat("pl-PL", { timeZone: "Europe/Warsaw", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      const h = +parts.find((p) => p.type === "hour").value, m = +parts.find((p) => p.type === "minute").value;
      return h * 60 + m;
    } catch (e) { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  }
  function statusText() {
    const now = warsawMinutes();
    if (now >= OPEN && now < CLOSE) {
      const left = CLOSE - now;
      return { open: true, text: left <= 45 ? `Otwarte jeszcze ${left} min · do 22:00` : "Otwarte teraz · do 22:00" };
    }
    return { open: false, text: now < OPEN ? "Zamknięte · otwieramy dziś o 12:00" : "Zamknięte · otwieramy jutro o 12:00" };
  }
  function paintStatus() {
    const s = statusText();
    $$("[data-status]").forEach((el) => { el.classList.toggle("is-closed", !s.open); $(".status__txt", el).textContent = s.text; });
    $$("[data-status-text]").forEach((el) => { el.textContent = s.text; });
  }
  paintStatus();
  setInterval(paintStatus, 60000);

  /* ---------- Wejście hero (po załadowaniu zdjęcia, maks. 1,2 s) ---------- */
  const hero = $(".hero");
  const start = () => requestAnimationFrame(() => hero.classList.add("is-in"));
  const pizza = $(".hero__bg img");
  if (reduced || !pizza || pizza.complete) start();
  else { pizza.addEventListener("load", start, { once: true }); setTimeout(start, 900); }

  /* ---------- Nagłówek: kremowy po zjechaniu z hero; pasek kciuka; strzałka ---------- */
  const top = $(".top"), bar = $(".thumbbar"), cue = $(".scrollcue");
  // nagłówek staje się kremowy, gdy dół hero minie górę ekranu
  const heroEndSentinel = document.createElement("div");
  heroEndSentinel.style.cssText = "position:absolute;left:0;bottom:72px;width:1px;height:1px;pointer-events:none";
  hero.appendChild(heroEndSentinel);
  new IntersectionObserver(([e]) => {
    const past = !e.isIntersecting && e.boundingClientRect.top < 0;
    top.classList.toggle("is-solid", past);
    bar && bar.classList.toggle("is-on", past);
  }).observe(heroEndSentinel);
  addEventListener("scroll", () => cue && cue.classList.add("is-gone"), { once: true, passive: true });
  // pierwszy ruch nad hero: nagłówek dostaje ciemne tło
  const moved = document.createElement("div");
  moved.style.cssText = "position:absolute;left:0;top:24px;width:1px;height:1px;pointer-events:none";
  hero.appendChild(moved);
  new IntersectionObserver(([e]) => top.classList.toggle("is-moved", !e.isIntersecting && e.boundingClientRect.top < 0)).observe(moved);
  // pasek kategorii menu przykleja się dokładnie pod nagłówkiem
  const setTopH = () => document.documentElement.style.setProperty("--top-h", top.offsetHeight + "px");
  new ResizeObserver(setTopH).observe(top);

  /* ---------- Paralaksa hero: pizza wolniej niż treść, tekst lekko gaśnie ---------- */
  const visual = $("[data-parallax]"), copy = $("[data-fade]");
  if (!reduced && visual && matchMedia("(min-width: 761px)").matches) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const h = hero.offsetHeight, y = Math.min(scrollY, h);
      visual.style.transform = `translate3d(0, ${(y * 0.15).toFixed(1)}px, 0)`;
      copy.style.opacity = String(1 - Math.min(y / (h * 0.9), 1) * 0.6);
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  /* ---------- Hasło: słowa zapalają się po kolei, gdy przekraczają linię ---------- */
  const tag = $("[data-words]");
  if (tag) {
    tag.innerHTML = tag.innerHTML.split(/(\s+|&nbsp;)/).map((w) => (/^(\s+|&nbsp;)$/.test(w) || !w ? w : `<span class="w${/uśmiechem/.test(w) ? " w--hot" : ""}">${w}</span>`)).join("");
    const words = $$(".w", tag);
    if (reduced) words.forEach((w) => w.classList.add("is-on"));
    else {
      let ticking = false;
      const paint = () => {
        ticking = false;
        const line = innerHeight * 0.72;
        words.forEach((w) => w.classList.toggle("is-on", w.getBoundingClientRect().top < line));
      };
      addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
      paint();
    }
  }

  /* ---------- Pojawianie się elementów (z krótkim przesunięciem w grupie) ---------- */
  const reveals = $$("[data-reveal]");
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((list) => list.forEach((e) => {
      if (!e.isIntersecting) return;
      const sibs = $$("[data-reveal]", e.target.parentElement);
      e.target.style.setProperty("--d", Math.min(sibs.indexOf(e.target), 5) * 60 + "ms");
      e.target.classList.add("is-seen");
      io.unobserve(e.target);
    }), { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add("is-seen"));

  /* ---------- Menu: aktywna kategoria w przyklejonym pasku ---------- */
  const cats = $$("[data-cat]");
  const groups = cats.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if (groups.length) {
    const io = new IntersectionObserver((list) => list.forEach((e) => {
      if (!e.isIntersecting) return;
      cats.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-30% 0px -60% 0px" });
    groups.forEach((g) => io.observe(g));
  }

  /* ---------- Nawigacja: zaznaczona bieżąca sekcja ---------- */
  const navLinks = $$(".top__nav a");
  const navTargets = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const navIO = new IntersectionObserver((list) => list.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  navTargets.forEach((t) => navIO.observe(t));

  /* ---------- Galeria: podgląd w oknie dialogowym ---------- */
  const lb = $(".lightbox");
  if (lb && lb.showModal) {
    const img = $("img", lb);
    $$(".shot").forEach((b) => b.addEventListener("click", () => {
      img.src = b.dataset.full; img.alt = $("img", b).alt; lb.showModal();
    }));
    $(".lightbox__close", lb).addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  }
})();
