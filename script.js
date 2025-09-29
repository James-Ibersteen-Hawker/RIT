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
    this.links.forEach((e, _) => {
      function clickFunction() {
        this.links.forEach((e) => (e[1] = false)), (e[1] = true);
      }
      e[0].addEventListener("mousedown", clickFunction.bind(this));
    });
    document.querySelector(".toTop").addEventListener("click", () => {
      window.scrollTo(0, 0);
      this.links.forEach(([e, _]) => e.classList.remove("active"));
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
      (e) =>
        (e[1] =
          window.scrollY +
          e[0].getBoundingClientRect().top -
          150 -
          document.querySelector(".LOGO").offsetHeight / 2)
    );
    if (!listener) return;
    window.addEventListener("scroll", () => PAGE.init(false));
    NAV.links.forEach((e) => {
      e[0].addEventListener(
        "click",
        (() => this.scroll(e[0].textContent)).bind(this)
      );
    });
    document.querySelector(".LOGO.Top").addEventListener("click", () => {
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
  footContent: [
    [
      "https://www.rit.edu/admissions/financial-aid",
      "Financial Aid",
      "585-475-2186",
      "ritaid@rit.edu",
    ],
    ["https://www.rit.edu/housing/", "Housing", "585-475-5000", "help.rit.edu"],
    [
      "https://www.rit.edu/studentlife/departments",
      "Student Affairs",
      "585-475-2265",
      "studentaffairs@rit.edu",
    ],
    [
      "https://www.rit.edu/admissions/first-year-application",
      "Undergraduate Admissions",
      "585-475-6631",
      "admissions@rit.edu",
    ],
    [
      "https://help.rit.edu/csp",
      "RIT Service Center",
      "585-475-5000",
      "help.rit.edu",
    ],
    [
      "https://www.rit.edu/admissions/graduate",
      "Graduate Admissions",
      "585-475-2229",
      "gradinfo@rit.edu",
    ],
  ],
  genFoot() {
    this.footContent.forEach(([link, name, number, mailto]) => {
      document.querySelector("footer").insertAdjacentHTML(
        "beforeend",
        `<div class="col-12 col-sm-6 col-md-4 col-lg-2 section">
        <div class="links row">
          <div class="col-4 col-sm-12">
            <a
              href="${link}"
              target="_blank"
              >${name}</a
            >
          </div>
          <div class="col-4 col-sm-12">
            <p class="stagger">${number}</p>
          </div>
          <div class="col-4 col-sm-12">
            <a class="noLine" href="mailto:${mailto}" target="_blank"
              >${mailto}</a
            >
          </div>
        </div>
      </div>`
      );
    });
  },
  async genMajors() {
    let text = await (await fetch("majors.txt")).text();
    text = text.split("\r").join("").split("\n").join("").split("~");
    const overList1 = document.createElement("ul");
    const overList2 = document.createElement("ul");
    const sectionCount = Math.round(text.length / 2);
    const section1 = document.createElement("div");
    const section2 = document.createElement("div");
    section1.append(overList1), section2.append(overList2);
    section1.classList.add("col-12", "col-md-6");
    section2.classList.add("col-12", "col-md-6");
    const container = document.querySelector("#majorsCollapse");
    container.append(section1), container.append(section2);
    let over = null;
    text.forEach((e, i) => {
      if (e[0] && e.at(-1) === "*") {
        const subList = document.createElement("li");
        if (i <= sectionCount) overList1.append(subList);
        else overList2.append(subList);
        subList.textContent = e.slice(1, e.length - 1);
        const sublistItems = document.createElement("ul");
        subList.append(sublistItems);
        sublistItems.id = e
          .slice(1, e.length - 1)
          .split(" ")
          .join("");
        over = sublistItems;
      } else {
        const li = document.createElement("li");
        li.textContent = e;
        over.append(li);
      }
    });
  },
  async genClubs() {
    let text = await (await fetch("clubs.txt")).text();
    text = text.split("\r").join("").split("\n").join("").split("~");
    const middle = text.length / 2;
    const ul1 = document.createElement("ul");
    const ul2 = document.createElement("ul");
    const section1 = document.createElement("div");
    const section2 = document.createElement("div");
    const container = document.getElementById("clubsCollapse");
    section1.append(ul1), section2.append(ul2);
    container.append(section1), container.append(section2);
    ul1.id = "clubs";
    ul2.id = "clubs";
    section1.classList.add("col-12", "col-lg-6");
    section2.classList.add("col-12", "col-lg-6");
    text.forEach((e, i) => {
      let li = document.createElement("li");
      li.textContent = e;
      if (i <= middle) ul1.append(li);
      else ul2.append(li);
    });
  },
  async genAlumns() {
    let alumni = await (await fetch("alumni.txt")).text();
    alumni = alumni.split("\r").join("").split("\n").join("").split("~");
    const container = document.getElementById("alumni");
    for (let i = 0; i < alumni.length; i += 3) {
      const elem = ` <div class="alumnus col-12 col-lg-6 col-xxl-4 py-3 px-3">
      <div class="row">
            <div class="col-5"><img src="people/${
              alumni[i + 2]
            }" alt="" class="img-fluid"/></div>
            <div class="col-7">
              <div class="h">${alumni[i].slice(1, alumni[i].length - 1)}</div>
              <div class="about">${alumni[i + 1]}</div>
            </div>
            </div>
          </div>`;
      container.insertAdjacentHTML("beforeend", elem);
    }
  },
  async genFaculty() {
    let faculty = await (await fetch("faculty.txt")).text();
    faculty = faculty.split("\r").join("").split("\n").join("").split("~");
    const container = document.getElementById("faculty");
    for (let i = 0; i < faculty.length; i += 3) {
      const elem = ` <div class="facultymember col-12 col-lg-6 col-xxl-4 py-3 px-3">
      <div class="row">
            <div class="col-5"><img src="people/${
              faculty[i + 2]
            }" alt="" class="img-fluid"/></div>
            <div class="col-7">
              <div class="h">${faculty[i].slice(0, faculty[i].length - 1)}</div>
              <div class="about">${faculty[i + 1]}</div>
            </div>
            </div>
          </div>`;
      container.insertAdjacentHTML("beforeend", elem);
    }
  },
  async init() {
    this.newQuote();
    this.genFoot();
    await this.genMajors();
    await this.genClubs();
    await this.genAlumns();
    await this.genFaculty();
  },
};

NAV.init();
PAGE.init(true);
TEXT.init();
