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

