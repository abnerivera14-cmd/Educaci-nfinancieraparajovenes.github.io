// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Simulador de ahorro =====
const metaInput = document.getElementById('metaInput');
const semanaInput = document.getElementById('semanaInput');
const semanasOut = document.getElementById('semanasOut');
const mesesOut = document.getElementById('mesesOut');
const totalOut = document.getElementById('totalOut');
const jarFill = document.getElementById('jarFill');

const JAR_TOP = 40;     // y donde empieza el frasco (vacío)
const JAR_BOTTOM = 130; // y donde termina el frasco (lleno)
const JAR_HEIGHT = JAR_BOTTOM - JAR_TOP;

function formatoMoneda(valor) {
  return '$' + Math.round(valor).toLocaleString('es-ES');
}

function actualizarSimulador() {
  const meta = Math.max(Number(metaInput.value) || 0, 0);
  const semanal = Math.max(Number(semanaInput.value) || 0, 1);

  const semanas = Math.max(Math.ceil(meta / semanal), 0);
  const meses = Math.round((semanas / 4.345) * 10) / 10;
  const total = semanas * semanal;

  semanasOut.textContent = semanas;
  mesesOut.textContent = meses;
  totalOut.textContent = formatoMoneda(total);
}

// Cálculo correcto del llenado del frasco (más semanas visibles = meta más "grande" percibida,
// así que aquí mostramos qué tan rápido se llega: menos semanas = frasco más lleno más rápido)
function actualizarFrasco() {
  const meta = Math.max(Number(metaInput.value) || 1, 1);
  const semanal = Math.max(Number(semanaInput.value) || 1, 1);
  const ritmo = Math.min(semanal / meta, 1); // qué fracción de la meta ahorras por semana
  const alturaLlena = JAR_HEIGHT * Math.min(ritmo * 6, 1); // escala visual amable

  jarFill.setAttribute('y', JAR_BOTTOM - alturaLlena);
  jarFill.setAttribute('height', alturaLlena);
}

function actualizarTodo() {
  actualizarSimulador();
  actualizarFrasco();
}

if (metaInput && semanaInput) {
  metaInput.addEventListener('input', actualizarTodo);
  semanaInput.addEventListener('input', actualizarTodo);
  actualizarTodo();
}
