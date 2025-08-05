const route = [
  { label: 'Home', href: '#home', page: 'grid.html' },
  { label: 'Progetti', href: '#progetti', page: 'project.html' },
  { label: 'Team', href: '#team', page: 'team.html' },
  { label: 'Contatti', href: '#contatti', page: 'contact.html' },
  { label: 'Press', href: '#press', page: 'press.html' }
];
function imageGrid() {
  return {
    gridPics: [],
    async loadImages() {
      const response = await fetch("structure.json")
      const data = await response.json();
      this.gridPics = fillTo18(data);
    }
  }
}

function fillTo18(arr, filler = {}) {
  const filled = [...arr];
  while (filled.length < 16) {
    filled.push({ ...filler });
  }
  return filled;
}
const grid = new Array(18).fill().map((_, i) => i + 1);
function hideAndShow() {
  return;
  const main = document.getElementById('main');
  const frm = document.getElementById('frm');
  if ([...main.classList].includes('d-block')) {
    frm.classList.toggle('d-block');
    main.classList.toggle('d-none');
    main.classList.toggle('no-show');
    return;
  }
  main.classList.toggle('no-show');
  frm.classList.toggle('d-none');
}
function submitForm(event) {
  event?.preventDefault();
  const form = document.querySelector('form');
  const contactBtn = document.querySelector('form .contact-btn');
  const formData = new FormData(form);

  contactBtn.disabled = true;
  contactBtn.textContent = "Invio in corso...";

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Toastify({
          text: "Il modulo è stato inviato con successo!",
          backgroundColor: "#000000",
          duration: 3000, close: true,
          gravity: "top", position: "center",
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
    .catch(error => {
      console.log(error)
      alert("Errore di rete. Riprova più tardi.");

      contactBtn.disabled = false;
      contactBtn.textContent = "Invia";
    });
}

function changeMosaic() {
  const mosaic = document.querySelector('.mosaic');
  if ([...mosaic.classList].find(x => x === 'col-md-3')) {

    [...document.querySelectorAll('.mosaic')].forEach(x => {
      x.classList.remove('col-md-3');
      x.classList.add('col-md-4');
    })
    return;
  }
  [...document.querySelectorAll('.mosaic')].forEach(x => {
    x.classList.remove('col-md-4');
    x.classList.add('col-md-3');
  })
}
