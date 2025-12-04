import {
  calcularIMC,
  gerarClassificacaoEDica,
  validarEntradas,
  formatarResultado,
} from "../src/utils/imc";

// ------------------------
// TESTES DA FUNÇÃO calcularIMC
// ------------------------
describe("Função calcularIMC", () => {
  it("deve calcular corretamente o IMC", () => {
    expect(calcularIMC("70", "170")).toBe(24.22);
  });

  it("deve aceitar vírgula como separador", () => {
    expect(calcularIMC("70,0", "1,70")).toBeCloseTo(24.22);
  });

  it("deve retornar NaN se peso for 0", () => {
    expect(calcularIMC(0, 170)).toBeNaN();
  });

  it("deve retornar NaN se altura for 0", () => {
    expect(calcularIMC(70, 0)).toBeNaN();
  });

  it("deve calcular corretamente com valores decimais", () => {
    expect(calcularIMC(63.5, 163)).toBeCloseTo(23.9);
  });
});

// ------------------------
// TESTES DA FUNÇÃO gerarClassificacaoEDica
// ------------------------
describe("Função gerarClassificacaoEDica", () => {
  it("Abaixo do peso para IMC 17", () => {
    const r = gerarClassificacaoEDica(17);
    expect(r.classificacao).toBe("Abaixo do peso");
  });

  it("Peso normal para IMC 23", () => {
    const r = gerarClassificacaoEDica(23);
    expect(r.classificacao).toBe("Peso normal");
  });

  it("Sobrepeso para IMC 27", () => {
    const r = gerarClassificacaoEDica(27);
    expect(r.classificacao).toBe("Sobrepeso");
  });

  it("Obesidade grau III (grave) para IMC 42", () => {
    const r = gerarClassificacaoEDica(42);
    expect(r.classificacao).toBe("Obesidade grau III (grave)");
  });
});

// ------------------------
// TESTES DA FUNÇÃO validarEntradas
// ------------------------
describe("Função validarEntradas", () => {
  it("valores válidos → true", () => {
    expect(validarEntradas("70", "170")).toBe(true);
  });

  it("peso vazio → false", () => {
    expect(validarEntradas("", "170")).toBe(false);
  });

  it("altura negativa → false", () => {
    expect(validarEntradas("70", "-180")).toBe(false);
  });
});

// ------------------------
// TESTES DA FUNÇÃO formatarResultado
// ------------------------
describe("Função formatarResultado", () => {
  it("formata corretamente", () => {
    expect(formatarResultado(24.2, "Peso normal")).toBe(
      "Seu IMC é 24.2 (Peso normal)"
    );
  });
});
