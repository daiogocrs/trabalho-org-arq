function aritimeticaClick() {
  const input1 = document.getElementById("inputA_aritimetica").value.trim();
  const input2 = document.getElementById("inputB_aritimetica").value.trim();
  const base1 = parseInt(document.getElementById("base1").value);
  const base2 = parseInt(document.getElementById("base2").value);
  const base3 = parseInt(document.getElementById("base3").value);
  const operacao = document.getElementById("operacao").value;

  try {
    validarNumeroBase(input1, base1);
    validarNumeroBase(input2, base2);

    const resultado = aritimetica(input1, input2, operacao, base1, base2, base3);
    document.getElementById("resultado_operacao").textContent = `Resultado: ${resultado}`;
  } catch (error) {
    document.getElementById("resultado_operacao").textContent = `Erro: ${error.message}`;
  }
}

function aritimetica(input1, input2, operacao, base1, base2, base3) {
  if (!input1 || !input2 || !operacao || !base1 || !base2 || !base3) {
    throw new Error("Número indefinido");
  }

  let input1Decimal = paraDecimal(input1, base1);
  let input2Decimal = paraDecimal(input2, base2);
  let resultado = 0;

  if (operacao === "+") {
    resultado = input1Decimal + input2Decimal;
  } else if (operacao === "-") {
    resultado = input1Decimal - input2Decimal;
  } else if (operacao === "*") {
    resultado = input1Decimal * input2Decimal;
  } else if (operacao === "/") {
    if (input2Decimal === 0) {
      throw new Error("Divisão por zero");
    }
    resultado = input1Decimal / input2Decimal;
  }

  resultado = paraNovaBase(resultado, base3);
  console.log(input1Decimal, operacao, input2Decimal, " = ", resultado);
  return resultado;
}

function validarNumeroBase(numero, base) {
  const validos = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
  for (let char of numero.toUpperCase()) {
    if (!validos.includes(char) && char !== ".") {
      throw new Error(`O número '${numero}' não é válido na base ${base}`);
    }
  }
}

function paraDecimal(input, base) {
  input = input.toUpperCase();

  const [parteInteira, parteFracionaria] = input.split(".");

  let decimal = 0;

  if (parteInteira) {
    for (let i = 0; i < parteInteira.length; i++) {
      const valor = parseInt(parteInteira[i], base);
      const expoente = parteInteira.length - 1 - i;
      decimal += valor * Math.pow(base, expoente);
    }
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

function paraNovaBase(input, base) {
  const hexDigits = "0123456789ABCDEF";
  let resultado = "";

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
      let tmp = base === 16 ? hexDigits[resto] : resto;
      parteInteira = tmp + parteInteira;
      quociente = Math.floor(quociente / base);
    }
  }

  resultado += parteInteira;

  if (fracao > 0) {
    resultado += ".";
    let contador = 0;
    let parteFracionaria = "";
    while (fracao > 0 && contador < 10) {
      fracao *= base;
      let digito = Math.floor(fracao);
      let tmp = base === 16 ? hexDigits[digito] : digito;
      parteFracionaria += tmp;
      fracao -= digito;
      contador++;
    }

    parteFracionaria = parteFracionaria.replace(/0+$/, "");

    if (parteFracionaria.length > 0) {
      resultado += parteFracionaria;
    } else {
      resultado = resultado.replace(/\.$/, "");
    }
  }

  return resultado;
}
