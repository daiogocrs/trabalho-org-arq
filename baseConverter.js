function converter(input = 0, base_origem, base_final) {
  let resultado = 0;
  let passos = "";

  switch (base_origem) {
    case 2:
      resultado = toDecimal(input, 2);
      passos = mostrarPassos(input, 2);
      console.log(`\nBIN(${input}) => DEC(${resultado}) \n` + passos + "\n");
      break;

    case 8:
      resultado = toDecimal(input, 8);
      passos = mostrarPassos(input, 8);
      console.log(`\nOCT(${input}) => DEC(${resultado}) \n` + passos + "\n");
      break;

    case 10:
      resultado = parseInt(input, 10);
      console.log(`\nDEC(${input}) => DEC(${resultado})\n`);
      break;

    case 16:
      resultado = toDecimal(input, 16);
      passos = mostrarPassos(input, 16);
      console.log(`\nHEX(${input}) => DEC(${resultado}) \n` + passos + "\n");
      break;
  }
}

function toDecimal(input, base) {
  let resultado = 0;
  let potencia = 0;

  for (let i = input.length - 1; i >= 0; i--) {
    let valor = parseInt(input[i], base);
    resultado += valor * Math.pow(base, potencia);
    potencia++;
  }
  console.log(resultado);
  return resultado;
}

function mostrarPassos(input, base) {
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

converter("ABCDEF", 16, 1226);
