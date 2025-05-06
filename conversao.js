function converterClick() {
  const input = document.getElementById("input").value.toUpperCase();
  const base_origem = parseInt(document.getElementById("baseOrigem").value);
  const base_final = parseInt(document.getElementById("baseDestino").value);
  const usarComplemento = document.getElementById("usarComplemento").checked;
  document.getElementById("resultado").textContent = "";

  converter(input, base_origem, base_final, usarComplemento);
}

function converter(input, base_origem, base_final, usarComplemento = false) {
  let decimal = 0;
  let passosDecimal = "";
  const output = [];

  if (input != 0) {
    if (base_origem != 10) {
      decimal = paraDecimal(input, base_origem, usarComplemento);
      passosDecimal = mostrarDecimal(input, base_origem);
      output.push(`\n${label(base_origem)}(${input}) => DEC(${decimal})`);
      output.push(passosDecimal + "\n");
    } else {
      decimal = parseFloat(input);
      output.push(`\nDEC(${input}) => DEC(${decimal})\n`);
    }

    output.push(`Passos para converter DEC(${decimal}) para ${label(base_final)}:`);

    let resultado;
    if (base_final === 2 && usarComplemento && decimal < 0) {
      resultado = decimalParaComplementoDeDois(decimal, 8);
      output.push(`Usando complemento de dois (8 bits):`);
    } else {
      resultado = paraNovaBase(decimal, base_final, true, output);
    }

    output.push(`\n=> ${label(base_final)}(${resultado})`);
    document.getElementById("resultado").textContent = output.join("\n");
  }
}

function paraDecimal(input, base, usarComplemento = false) {
  input = input.toUpperCase();
  const [parteInteira, parteFracionaria] = input.split(".");

  let decimal = 0;

  if (usarComplemento && base === 2 && !parteFracionaria) {
    const n = parteInteira.length;
    const isNegativo = parteInteira[0] === "1";

    if (isNegativo) {
      const decimalPositivo = parseInt(parteInteira, 2);
      decimal = decimalPositivo - Math.pow(2, n);
      return decimal;
    }
  }

  for (let i = 0; i < parteInteira.length; i++) {
    const valor = parseInt(parteInteira[i], base);
    const expoente = parteInteira.length - 1 - i;
    decimal += valor * Math.pow(base, expoente);
  }

  if (parteFracionaria) {
    for (let i = 0; i < parteFracionaria.length; i++) {
      const valor = parseInt(parteFracionaria[i], base);
      const expoente = -(i + 1);
      decimal += valor * Math.pow(base, expoente);
    }
  }

  return decimal;
}

function mostrarDecimal(input, base) {
  const isNegative = input[0] === "-";
  if (isNegative) input = input.slice(1);

  const [parteInteira, parteFracionaria] = input.split(".");

  let passos = "";
  for (let i = 0; i < parteInteira.length; i++) {
    let valor = parseInt(parteInteira[i], base);
    let expoente = parteInteira.length - 1 - i;
    passos += `${valor} x ${base}^${expoente}`;
    if (i < parteInteira.length - 1 || parteFracionaria) passos += " + ";
  }

  if (parteFracionaria) {
    for (let i = 0; i < parteFracionaria.length; i++) {
      let valor = parseInt(parteFracionaria[i], base);
      let expoente = -(i + 1);
      passos += `${valor} x ${base}^${expoente}`;
      if (i < parteFracionaria.length - 1) passos += " + ";
    }
  }

  return isNegative ? "-(" + passos + ")" : passos;
}

function paraNovaBase(input, base, mostrarPassos = false, output = []) {
  const hexDigits = "0123456789ABCDEF";
  let resultado = "";

  const isNegative = input < 0;
  input = Math.abs(input);

  let inteiro = Math.floor(input);
  let fracao = input - inteiro;

  let parteInteira = "";
  let quociente = inteiro;

  if (quociente === 0) {
    parteInteira = "0";
  } else {
    while (quociente > 0) {
      let resto = quociente % base;
      if (mostrarPassos) {
        output.push(`${quociente} / ${base} = ${Math.floor(quociente / base)}, resto = ${resto}`);
      }
      let tmp = base === 16 ? hexDigits[resto] : resto;
      parteInteira = tmp + parteInteira;
      quociente = Math.floor(quociente / base);
    }
  }

  resultado += parteInteira;

  if (fracao > 0) {
    resultado += ".";
    let contador = 0;
    while (fracao > 0 && contador < 10) {
      fracao *= base;
      let digito = Math.floor(fracao);
      let tmp = base === 16 ? hexDigits[digito] : digito;
      resultado += tmp;
      fracao -= digito;
      contador++;
    }
  }

  return isNegative ? "-" + resultado : resultado;
}

function decimalParaComplementoDeDois(decimal, bits = 8) {
  if (decimal >= 0) return decimal.toString(2).padStart(bits, "0");

  const complemento = (Math.pow(2, bits) + decimal).toString(2);
  return complemento.slice(-bits);
}

function label(base) {
  switch (base) {
    case 2:
      return "BIN";
    case 8:
      return "OCT";
    case 10:
      return "DEC";
    case 16:
      return "HEX";
    default:
      return `BASE${base}`;
  }
}

const baseOrigemSelect = document.getElementById("baseOrigem");
const tecladoContainer = document.getElementById("teclado-conversao");
const telaConversao = document.getElementById("tela-conversao");
const inputOculto = document.getElementById("input");

const botoesPorBase = {
  2: ["0", "1"],
  8: ["0", "1", "2", "3", "4", "5", "6", "7"],
  10: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  16: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
};

function atualizarTeclado() {
  const base = parseInt(baseOrigemSelect.value);
  const teclas = botoesPorBase[base];
  tecladoContainer.innerHTML = "";

  teclas.forEach(valor => {
    const btn = document.createElement("button");
    btn.textContent = valor;
    btn.onclick = () => adicionarChar(valor);
    tecladoContainer.appendChild(btn);
  });

  const backspace = document.createElement("button");
  backspace.textContent = "←";
  backspace.onclick = () => {
    inputOculto.value = inputOculto.value.slice(0, -1);
    atualizarTela();
  };
  tecladoContainer.appendChild(backspace);

  const clear = document.createElement("button");
  clear.textContent = "C";
  clear.onclick = () => {
    inputOculto.value = "";
    atualizarTela();
  };
  tecladoContainer.appendChild(clear);
}

function adicionarChar(char) {
  inputOculto.value += char;
  atualizarTela();
}

function atualizarTela() {
  telaConversao.textContent = inputOculto.value || "0";
}

baseOrigemSelect.addEventListener("change", () => {
  inputOculto.value = "";
  atualizarTela();
  atualizarTeclado();
});

window.addEventListener("DOMContentLoaded", () => {
  atualizarTeclado();
  atualizarTela();
});