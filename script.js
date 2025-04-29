// Função para alternar entre as seções
function toggleSections() {
    const conversaoSection = document.getElementById("conversao");
    const operacoesSection = document.getElementById("operacoes");
    const btnToggle = document.getElementById("btnToggle");

    if (conversaoSection.style.display === "none") {
      conversaoSection.style.display = "block";
      operacoesSection.style.display = "none";
      btnToggle.textContent = "Mostrar Operações";
      btnToggle.classList.remove('operacoes');
      btnToggle.classList.add('conversao');
    } else {
      conversaoSection.style.display = "none";
      operacoesSection.style.display = "block";
      btnToggle.textContent = "Mostrar Conversão";
      btnToggle.classList.remove('conversao');
      btnToggle.classList.add('operacoes');
    }
  }

  // Função para ativar/desativar o modo escuro
  function toggleDarkMode() {
    document.body.classList.toggle("dark");
    const icon = document.getElementById("dark-mode-icon");
    icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  }
  
  // Mostra ou oculta o campo de complemento de dois conforme a base de origem
  document.getElementById("baseOrigem").addEventListener("change", function () {
    const complementoWrapper = document.getElementById("complementoWrapper");
    complementoWrapper.style.display = this.value === "2" ? "block" : "none";
  });

  // Inicializa as seções
  window.onload = function () {
    document.getElementById("conversao").style.display = "block";
    document.getElementById("operacoes").style.display = "none";
    document.getElementById("complementoWrapper").style.display =
    document.getElementById("baseOrigem").value === "2" ? "block" : "none";
  };