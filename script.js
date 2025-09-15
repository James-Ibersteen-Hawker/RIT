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
  points: Array.from(DOC.querySelectorAll(".heading")).map((e) => [e, 0]),
  init() {
    this.points.forEach(
      (e) => (e[1] = window.scrollY + e[0].getBoundingClientRect().top - 160)
    );
    NAV.links.forEach((e) => {
      e[0].addEventListener(
        "click",
        (() => this.scroll(e[0].textContent)).bind(this)
      );
    });
  },
  scroll(h) {
    const point = this.points.find((e) => e[0].textContent === h)?.[1];
    window.scrollTo({ top: point || 0, left: 0, behavior: "smooth" });
  },
};

NAV.init();
PAGE.init();
window.addEventListener("scroll", PAGE.init);
