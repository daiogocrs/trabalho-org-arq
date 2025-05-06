function toggleSections() {
  const conversaoSection = document.getElementById("conversao");
  const operacoesSection = document.getElementById("operacoes");
  const btnToggle = document.getElementById("btnToggle");

  conversaoSection.classList.toggle("active");
  operacoesSection.classList.toggle("active");

  const isConversaoAtiva = conversaoSection.classList.contains("active");
  btnToggle.textContent = isConversaoAtiva ? "Mostrar Operações" : "Mostrar Conversão";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("dark-mode-icon");
  icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

function initComplementoListener() {
  const baseOrigem = document.getElementById("baseOrigem");
  const complementoWrapper = document.getElementById("complementoWrapper");

  baseOrigem.addEventListener("change", function () {
    complementoWrapper.style.display = this.value === "2" ? "block" : "none";
  });
}

function toggleSeçõesIniciais() {
  document.getElementById("conversao").classList.add("active");
  document.getElementById("operacoes").classList.remove("active");

  const baseOrigem = document.getElementById("baseOrigem");
  const complementoWrapper = document.getElementById("complementoWrapper");
  complementoWrapper.style.display = baseOrigem.value === "2" ? "block" : "none";
}

function init() {
  toggleSeçõesIniciais();
  initComplementoListener();
}

window.onload = init;