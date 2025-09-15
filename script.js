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
NAV.init();
