// Alterna entre as seções usando classes CSS
function toggleSections() {
  const conversaoSection = document.getElementById("conversao");
  const operacoesSection = document.getElementById("operacoes");
  const btnToggle = document.getElementById("btnToggle");

  conversaoSection.classList.toggle("active");
  operacoesSection.classList.toggle("active");

  const isConversaoAtiva = conversaoSection.classList.contains("active");
  btnToggle.textContent = isConversaoAtiva ? "Mostrar Operações" : "Mostrar Conversão";
}

// Alterna o modo escuro e o ícone do botão
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("dark-mode-icon");
  icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// Mostra ou oculta o campo de complemento de dois com base na base de origem
function initComplementoListener() {
  const baseOrigem = document.getElementById("baseOrigem");
  const complementoWrapper = document.getElementById("complementoWrapper");

  baseOrigem.addEventListener("change", function () {
    complementoWrapper.style.display = this.value === "2" ? "block" : "none";
  });
}

// Inicializa o estado inicial das seções e campos
function toggleSeçõesIniciais() {
  document.getElementById("conversao").classList.add("active");
  document.getElementById("operacoes").classList.remove("active");

  const baseOrigem = document.getElementById("baseOrigem");
  const complementoWrapper = document.getElementById("complementoWrapper");
  complementoWrapper.style.display = baseOrigem.value === "2" ? "block" : "none";
}

// Inicialização geral do script
function init() {
  toggleSeçõesIniciais();
  initComplementoListener();
}

// Roda ao carregar a página
window.onload = init;
