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



function toggleSeçõesIniciais() {
  document.getElementById("conversao").classList.add("active");
  document.getElementById("operacoes").classList.remove("active");
}

function init() {
  toggleSeçõesIniciais();
}

window.onload = init;