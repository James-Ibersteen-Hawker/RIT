const DOC = document;
const NAV = {
  src: document.querySelector("header"),
  links: Array.from(document.querySelectorAll(".link")).map(
    (e) =>
      new Proxy([e, false], {
        set(t, p, v) {
          if (Number(p) === 1) {
            let reflect = Reflect.set(t, p, v);
            if (t[p] === false) t[0].classList.remove("active");
            else if (t[p] === true) t[0].classList.add("active");
            return reflect;
          }
        },
      })
  ),
  init() {
    this.links.forEach((e, i) => {
      function clickFunction() {
        this.links.forEach((e) => (e[1] = false)), (e[1] = true);
      }
      e[0].addEventListener("mousedown", clickFunction.bind(this));
    });
  },
};
const PAGE = {
  points: [],
  init(listener = false) {
    const headings = Array.from(DOC.querySelectorAll(".linkTo")).map((e) => [
      e,
      0,
    ]);
    this.points = headings;
    this.points.forEach(
      (e) => (e[1] = window.scrollY + e[0].getBoundingClientRect().top - 150)
    );
    if (!listener) return;
    window.addEventListener("scroll", () => PAGE.init(false));
    NAV.links.forEach((e) => {
      e[0].addEventListener(
        "click",
        (() => this.scroll(e[0].textContent)).bind(this)
      );
    });
    document.querySelector(".LOGO").addEventListener("click", () => {
      window.scrollTo(0, 0);
      NAV.links.forEach(([e, _]) => e.classList.remove("active"));
    });
  },
  scroll(h) {
    const point = this.points.find((e) => e[0].textContent === h)?.[1];
    window.scrollTo({ top: point || 0, left: 0, behavior: "smooth" });
  },
};
const TEXT = {
  quotes: [
    "We shape the future and improve the world through creativity and innovation",
    "We're driving progress, we're shaping what's possible",
    "Fostering vibrant culture through inclusivity, connectivity, and opportunity",
    "At RIT, we don't settle for the ordinary—we strive for the extraordinary",
    "Drive progress. Shape what's possible. Transform the future",
  ],
  newQuote() {
    document.querySelector(".quoteText").textContent =
      this.quotes[Math.floor(Math.random() * this.quotes.length)] + ".";
  },
  init() {
    this.newQuote();
  },
};

NAV.init();
PAGE.init(true);
TEXT.init();
