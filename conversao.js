function converterClick() {
  const input = document.getElementById("input").value.toUpperCase();
  const base_origem = parseInt(document.getElementById("baseOrigem").value);
  const base_final = parseInt(document.getElementById("baseDestino").value);

  document.getElementById("resultado").textContent = "";
  converter(input, base_origem, base_final);
}

function converter(input = 0, base_origem, base_final) {
  let decimal = 0;
  let passosDecimal = "";
  const output = [];

  if (base_origem !== 10) {
    decimal = paraDecimal(input, base_origem);
    passosDecimal = mostrarDecimal(input, base_origem);
    output.push(`\n${label(base_origem)}(${input}) => DEC(${decimal})`);
    output.push(passosDecimal + "\n");
  } else {
    decimal = parseInt(input, 10);
    output.push(`\nDEC(${input}) => DEC(${decimal})\n`);
  }

  output.push(`Passos para converter DEC(${decimal}) para ${label(base_final)}:`);
  let resultado = paraNovaBase(decimal, base_final, true, output);
  output.push(`\n=> ${label(base_final)}(${resultado})`);
  document.getElementById("resultado").textContent = output.join("\n");
}
function paraDecimal(input, base) {
  input = input.toUpperCase();
  const [parteInteira, parteFracionaria] = input.split(".");

  let decimal = 0;

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
  let passos = "";
  let potencia = input.length - 1;

  for (let i = 0; i < input.length; i++) {
    let valor = parseInt(input[i], base);
    passos += `${valor} x ${base}^${potencia}`;
    if (potencia > 0) passos += " + ";
    potencia--;
  }

  return passos;
}

function paraNovaBase(input, base, mostrarPassos = false, output = []) {
  const hexDigits = "0123456789ABCDEF";

  let inteiro = Math.floor(input);
  let fracao = input - inteiro;
  let resultado = "";

  // Parte inteira
  let parteInteira = "";
  let quociente = inteiro;

  do {
    let resto = quociente % base;
    if (mostrarPassos) {
      output.push(`${quociente} / ${base} = ${Math.floor(quociente / base)}, resto = ${resto}`);
    }
    let tmp = base === 16 ? hexDigits[resto] : resto;
    parteInteira = tmp + parteInteira;
    quociente = Math.floor(quociente / base);
  } while (quociente > 0);

  resultado += parteInteira;

  // Parte fracionária
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

  return resultado;
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

