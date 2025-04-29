// Função chamada ao clicar para realizar a operação aritmética
function aritimeticaClick() {
  const input1 = document.getElementById("input_operacoes").value.trim();
  const baseOP = parseInt(document.getElementById("baseOP").value);

  if (input1 === "" || isNaN(baseOP)) {
    alert("Por favor, insira um valor válido.");
    return;
  }

  // Identificar a operação na string
  const operacao = obterOperacao(input1);
  if (!operacao) {
    alert("Por favor, insira uma operação válida.");
    return;
  }

  // Dividir a entrada em duas partes com base na operação
  const [inputA, inputB] = input1.split(operacao);
  if (!inputB) {
    alert("Erro: Digite corretamente a expressão para a operação.");
    return;
  }

  // Converta as partes para o formato decimal, de acordo com a base selecionada
  const input1Decimal = paraDecimal(inputA.trim(), baseOP);
  const input2Decimal = paraDecimal(inputB.trim(), baseOP);
  let resultado = 0;

  switch (operacao) {
    case "+":
      resultado = input1Decimal + input2Decimal;
      break;
    case "-":
      resultado = input1Decimal - input2Decimal;
      break;
    case "*":
      resultado = input1Decimal * input2Decimal;
      break;
    case "/":
      if (input2Decimal === 0) {
        alert("Erro: Divisão por zero.");
        return;
      }
      resultado = input1Decimal / input2Decimal;
      break;
    default:
      alert("Operação inválida");
      return;
  }

  // Exibir o resultado
  const resultadoBaseSelecionada = paraNovaBase(resultado, baseOP);
  document.getElementById("resultado_operacao").textContent = `Resultado: ${resultadoBaseSelecionada}`;
}

// Função para obter a operação da string
function obterOperacao(input) {
  if (input.includes('+')) return '+';
  if (input.includes('-')) return '-';
  if (input.includes('*')) return '*';
  if (input.includes('/')) return '/';
  return null;
}

// Função para converter para base decimal
function paraDecimal(input, base) {
  input = input.toUpperCase();
  const [parteInteira, parteFracionaria] = input.split(".");

  let decimal = 0;
  // Parte inteira
  for (let i = 0; i < parteInteira.length; i++) {
    const valor = parseInt(parteInteira[i], base);
    const expoente = parteInteira.length - 1 - i;
    decimal += valor * Math.pow(base, expoente);
  }

  // Parte fracionária
  if (parteFracionaria) {
    for (let i = 0; i < parteFracionaria.length; i++) {
      const valor = parseInt(parteFracionaria[i], base);
      const expoente = -(i + 1);
      decimal += valor * Math.pow(base, expoente);
    }
  }

  return decimal;
}

// Função para converter o número decimal para qualquer base
function paraNovaBase(input, base) {
  const hexDigits = "0123456789ABCDEF";
  let resultado = "";

  const isNegative = input < 0;
  input = Math.abs(input);

  let inteiro = Math.floor(input);
  let fracao = input - inteiro;

  let parteInteira = "";
  let quociente = inteiro;

  while (quociente > 0) {
    let resto = quociente % base;
    parteInteira = hexDigits[resto] + parteInteira;
    quociente = Math.floor(quociente / base);
  }

  resultado += parteInteira;

  if (fracao > 0) {
    resultado += ".";
    let contador = 0;
    while (fracao > 0 && contador < 10) {
      fracao *= base;
      let digito = Math.floor(fracao);
      resultado += hexDigits[digito];
      fracao -= digito;
      contador++;
    }
  }

  return isNegative ? "-" + resultado : resultado;
}

// Função que cria o teclado de operações com base na base selecionada
const tecladoOperacoesContainer = document.getElementById("teclado-operacoes");
const botoesPorBaseOperacoes = {
  2: ["0", "1"],
  8: ["0", "1", "2", "3", "4", "5", "6", "7"],
  10: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  16: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
};

function atualizarTecladoOperacoes() {
  const base = parseInt(document.getElementById("baseOP").value);
  const teclas = botoesPorBaseOperacoes[base];
  tecladoOperacoesContainer.innerHTML = "";

  teclas.forEach(valor => {
    const btn = document.createElement("button");
    btn.textContent = valor;
    btn.onclick = () => adicionarCharOperacoes(valor);
    tecladoOperacoesContainer.appendChild(btn);
  });

  const backspace = document.createElement("button");
  backspace.textContent = "←";
  backspace.onclick = () => {
    document.getElementById("input_operacoes").value = document.getElementById("input_operacoes").value.slice(0, -1);
    document.getElementById("tela-operacoes").textContent = document.getElementById("input_operacoes").value;
  };
  tecladoOperacoesContainer.appendChild(backspace);

  // Adiciona o botão 'C' para limpar a tela
  const limparTelaBtn = document.createElement("button");
  limparTelaBtn.textContent = "C";
  limparTelaBtn.onclick = limparTela;
  tecladoOperacoesContainer.appendChild(limparTelaBtn);

  // Botões para operações aritméticas
  const operacoes = ["+", "-", "*", "/"];
  operacoes.forEach(op => {
    const opBtn = document.createElement("button");
    opBtn.textContent = op;
    opBtn.onclick = () => adicionarCharOperacoes(op);
    tecladoOperacoesContainer.appendChild(opBtn);
  });
}

// Função para adicionar caracteres no display
function adicionarCharOperacoes(caractere) {
  document.getElementById("input_operacoes").value += caractere;
  document.getElementById("tela-operacoes").textContent = document.getElementById("input_operacoes").value;
}

// Função para limpar a tela de operações
function limparTela() {
  document.getElementById("input_operacoes").value = "";
  document.getElementById("tela-operacoes").textContent = "0"; // Exibe 0 na tela
}

// Atualiza o teclado sempre que a base muda
document.getElementById("baseOP").addEventListener("change", atualizarTecladoOperacoes);
atualizarTecladoOperacoes();
