function converter(input = 0, base_origem, base_final) {
  let decimal = 0;
  let passosDecimal = "";

  if (base_origem !== 10) {
    decimal = paraDecimal(input, base_origem);
    passosDecimal = mostrarDecimal(input, base_origem);
    console.log(`\n${label(base_origem)} (${input}) => DEC(${decimal})`);
    console.log(passosDecimal + "\n");
  } else {
    decimal = parseInt(input, 10);
    console.log(`\nDEC(${input}) => DEC(${decimal})\n`);
  }

  let resultado = paraNovaBase(decimal, base_final, true);
  console.log(`\n=> ${label(base_final)}(${resultado})`);
}

function paraDecimal(input, base) {
  let decimal = 0;
  let potencia = 0;

  for (let i = input.length - 1; i >= 0; i--) {
    let valor = parseInt(input[i], base);
    decimal += valor * Math.pow(base, potencia);
    potencia++;
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

function paraNovaBase(input, base, mostrarPassos = false) {
  let resultado = "";
  const hexDigits = "0123456789ABCDEF";
  let quociente = input;

  do {
    let resto = quociente % base;
    if (mostrarPassos) {
      console.log(`${quociente} / ${base} = ${Math.floor(quociente / base)}, resto = ${resto}`);
    }
    let tmp = base === 16 ? hexDigits[resto] : resto;
    resultado = tmp + resultado;
    quociente = Math.floor(quociente / base);
  } while (quociente > 0);

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

converter("ABCDF", 16, 2);
