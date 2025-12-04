import { calcularIMC, gerarClassificacaoEDica, validarEntradas, formatarResultado, parseNumero } from "../src/utils/imc";

describe("parseNumero", () => {
  test("converte string com ponto", () => {
    expect(parseNumero("68.5")).toBe(68.5);
  });

  test("converte string com vírgula", () => {
    expect(parseNumero("68,5")).toBe(68.5);
  });

  test("converte número", () => {
    expect(parseNumero(70)).toBe(70);
  });

  test("entrada inválida retorna NaN", () => {
    expect(parseNumero("abc")).toBeNaN();
    expect(parseNumero({})).toBeNaN();
    expect(parseNumero(null)).toBeNaN();
  });
});

describe("calcularIMC", () => {
  test("IMC normal", () => {
    expect(calcularIMC(70, 1.75)).toBeCloseTo(22.86);
  });

  test("IMC com altura em cm", () => {
    expect(calcularIMC(70, 175)).toBeCloseTo(22.86);
  });

  test("entrada inválida retorna NaN", () => {
    expect(calcularIMC(0, 1.7)).toBeNaN();
    expect(calcularIMC(-5, 1.7)).toBeNaN();
    expect(calcularIMC(70, 0)).toBeNaN();
    expect(calcularIMC(70, 500)).toBeNaN();
    expect(calcularIMC("abc", 1.7)).toBeNaN();
  });
});

describe("gerarClassificacaoEDica", () => {
  test("Abaixo do peso", () => {
    const res = gerarClassificacaoEDica(17);
    expect(res.classificacao).toBe("Abaixo do peso");
  });

  test("Peso normal", () => {
    const res = gerarClassificacaoEDica(22);
    expect(res.classificacao).toBe("Peso normal");
  });

  test("Sobrepeso", () => {
    const res = gerarClassificacaoEDica(27);
    expect(res.classificacao).toBe("Sobrepeso");
  });

  test("Obesidade grau I", () => {
    const res = gerarClassificacaoEDica(32);
    expect(res.classificacao).toBe("Obesidade grau I");
  });

  test("Obesidade grau II", () => {
    const res = gerarClassificacaoEDica(37);
    expect(res.classificacao).toBe("Obesidade grau II");
  });

  test("Obesidade grau III", () => {
    const res = gerarClassificacaoEDica(42);
    expect(res.classificacao).toBe("Obesidade grau III (grave)");
  });
});

describe("validarEntradas", () => {
  test("entradas válidas", () => {
    expect(validarEntradas(70, 1.7)).toBe(true);
    expect(validarEntradas("70", "1.7")).toBe(true);
  });

  test("entradas inválidas", () => {
    expect(validarEntradas(0, 1.7)).toBe(false);
    expect(validarEntradas(70, 0)).toBe(false);
    expect(validarEntradas(-5, 1.7)).toBe(false);
    expect(validarEntradas(70, "abc")).toBe(false);
    expect(validarEntradas("", "")).toBe(false);
  });
});

describe("formatarResultado", () => {
  test("formata corretamente", () => {
    expect(formatarResultado(22.86, "Peso normal")).toBe("Seu IMC é 22.86 (Peso normal)");
  });
});
