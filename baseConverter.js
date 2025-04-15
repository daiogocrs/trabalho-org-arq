function converterClick() {
  const input = document.getElementById("input").value.toUpperCase();
  const base_origem = parseInt(document.getElementById("baseOrigem").value);
  const base_final = parseInt(document.getElementById("baseDestino").value);

  document.getElementById("resultado").textContent = "";
  converter(input, base_origem, base_final);
}

function aritimeticaClick() {
  const input1 = document.getElementById("inputA_aritimetica").value;
  const input2 = document.getElementById("inputB_aritimetica").value;
  const base1 = document.getElementById("base1").value;
  const base2 = document.getElementById("base2").value;
  const base3 = document.getElementById("base3").value;
  const operacao = document.getElementById("operacao").value;
  console.log(aritimetica(input1, input2, operacao, base1, base2, base3));
}

function aritimetica(input1, input2, operacao, base1, base2, base3) {
  let input1Decimal = paraDecimal(input1, base1);
  let input2Decimal = paraDecimal(input2, base2);
  let resultado = 0;
  if (operacao == "+") {
    resultado = input1Decimal + input2Decimal;
  } else if (operacao == "-") {
    resultado = input1Decimal - input2Decimal;
  } else if (operacao == "*") {
    resultado = input1Decimal * input2Decimal;
  } else if (operacao == "/") {
    resultado = input1Decimal / input2Decimal;
  }
  resultado = paraNovaBase(Math.floor(resultado), base3);
  console.log(input1Decimal, operacao, input2Decimal, " = ", resultado);
  //RESULTADO COM PONTO FLUTUANTE? COMO FAZ ISSO??????
  return resultado;
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

function paraNovaBase(input, base, mostrarPassos = false, output = []) {
  let resultado = "";
  const hexDigits = "0123456789ABCDEF";
  let quociente = input;

  do {
    let resto = quociente % base;
    if (mostrarPassos) {
      output.push(`${quociente} / ${base} = ${Math.floor(quociente / base)}, resto = ${resto}`);
    }
    let tmp = base == 16 ? hexDigits[resto] : resto;
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
