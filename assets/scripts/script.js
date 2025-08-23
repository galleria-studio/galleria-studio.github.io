const route = [
  { label: "Home", href: "/", page: "grid.html", active: false },
  { label: "Progetti", href: "/progetti", page: "project.html", active: false },
  { label: "Team", href: "/team", page: "team.html", active: false },
  { label: "Press", href: "/press", page: "press.html", active: false },
  { label: "Contatti", href: "/contatti", page: "contact.html", active: false },
];

let currentProjectDetail = undefined;

function imageGrid() {
  return {
    gridPics: [],
    async loadImages() {
      const response = await fetch("structure.json");
      const data = [...(await response.json())].map((x) => ({
        ...x,
        visible: false,
      }));
      this.gridPics = fillTo18(data);
    },
    async cellClick(cell) {
      const response = await fetch(`details/${cell.id}.json`);
      currentProjectDetail = await response.json();
      currentProjectDetail = { ...currentProjectDetail, id: cell.id };
      loadPage("detail.html");
    },
  };
}

function projects() {
  return {
    projects: [],
    async loadProjects() {
      const response = await fetch("project.json");
      this.projects = await response.json();
    },
  };
}

function fillTo18(arr, filler = { visible: false }) {
  const size = 4; // griglia 4x4
  const result = [];
  let index = 0;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const placeItem = (col + row) % 2 === 0;

      if (placeItem && index < arr.length) {
        result.push(arr[index++]); // elemento originale
      } else {
        result.push({ ...filler }); // filler
      }
    }
  }

  return result;
}
const grid = new Array(18).fill().map((_, i) => i + 1);
function hideAndShow() {
  return;
  const main = document.getElementById("main");
  const frm = document.getElementById("frm");
  if ([...main.classList].includes("d-block")) {
    frm.classList.toggle("d-block");
    main.classList.toggle("d-none");
    main.classList.toggle("no-show");
    return;
  }
  main.classList.toggle("no-show");
  frm.classList.toggle("d-none");
}
function submitForm(event) {
  event?.preventDefault();
  const form = document.querySelector("form");
  const contactBtn = document.querySelector("form .contact-btn");
  const formData = new FormData(form);

  contactBtn.disabled = true;
  contactBtn.textContent = "Invio in corso...";

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Toastify({
          text: "Il modulo è stato inviato con successo!",
          backgroundColor: "#000000",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
        }).showToast();
      } else {
        alert("Si è verificato un errore. Riprova.");
      }

      contactBtn.disabled = false;
      contactBtn.textContent = "Invia";
      setTimeout(() => {
        hideAndShow();
      }, 300);
    })
    .catch((error) => {
      console.log(error);
      alert("Errore di rete. Riprova più tardi.");

      contactBtn.disabled = false;
      contactBtn.textContent = "Invia";
    });
}

function changeMosaic() {
  const mosaic = document.querySelector(".mosaic");
  if ([...mosaic.classList].find((x) => x === "col-lg-3")) {
    [...document.querySelectorAll(".mosaic")].forEach((x) => {
      x.classList.remove("col-lg-3");
      x.classList.add("col-lg-4");
    });
    return;
  }
  [...document.querySelectorAll(".mosaic")].forEach((x) => {
    x.classList.remove("col-lg-4");
    x.classList.add("col-lg-3");
  });
}
function navbar() {
  return {
    activeHref: window.location.pathname || "/",
    menuItems: route,
    navigate(href, page, label) {
      sessionStorage.redirect = href;
      this.activeHref = href;

      history.pushState({ href, page }, "", href);
      setActive(document.querySelector(`#${label}`));
      if (page) {
        loadPage(page);
      }
      const nav = document.getElementById("nav");
      if (nav.classList.contains("position-absolute")) {
        nav.classList.remove("position-absolute", "w-100");
        [...nav.querySelectorAll("ul a")].forEach((x) => {
          x.classList.remove("text-white");
          x.classList.add("text-black");
        });
      }
    },
  };
}
function setActive(element) {
  [...document.querySelectorAll(".active")]?.forEach((x) =>
    x.classList.remove("active")
  );
  element.classList.add("active");
}

function loadDetail() {
  return {
    pasta() {
      alert("ok");
    },
  };
}

function loadPage(page) {
  const container = document.getElementById("content");
  container.classList.remove("content-visible");
  setTimeout(() => {
    fetch(page)
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML = html;
        void container.offsetWidth;
        container.classList.add("content-visible");
      })
      .catch((err) => {
        document.getElementById("content").innerHTML =
          "<p>Errore nel caricamento della pagina.</p>";
        container.classList.add("content-visible");
      });
  }, 300);
}

window.initDetail = function iniDetail() {
  const nav = document.getElementById("nav");
  nav.classList.add("position-absolute", "w-100");
  [...nav.querySelectorAll("ul a")].forEach((x) => {
    x.classList.remove("text-black");
    x.classList.add("text-white");
  });
  nav.style.zIndex = 3;
};
