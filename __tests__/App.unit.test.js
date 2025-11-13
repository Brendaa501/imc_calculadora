
// Função 1 — Calcular IMC
const calcularIMC = (peso, alturaCm) => {
  if (!peso || !alturaCm || peso <= 0 || alturaCm <= 0) return NaN;
  const alturaM = alturaCm / 100;
  return +(peso / (alturaM * alturaM)).toFixed(2);
};

// Função 2 — Gerar classificação e dica
const gerarClassificacaoEDica = (imc) => {
  if (imc < 18.5)
    return {
      classificacao: "Abaixo do peso",
      dica: "Procure manter uma alimentação balanceada.",
      cor: "#2196F3",
    };
  else if (imc < 24.9)
    return {
      classificacao: "Peso normal",
      dica: "Continue se alimentando bem e praticando exercícios!",
      cor: "#4CAF50",
    };
  else if (imc < 29.9)
    return {
      classificacao: "Sobrepeso",
      dica: "Reduza alimentos ultraprocessados e faça mais atividade física.",
      cor: "#FFC107",
    };
  else if (imc < 34.9)
    return {
      classificacao: "Obesidade grau I",
      dica: "Procure acompanhamento médico e nutricional.",
      cor: "#FF9800",
    };
  else if (imc < 39.9)
    return {
      classificacao: "Obesidade grau II (severa)",
      dica: "É importante buscar orientação profissional.",
      cor: "#FF5722",
    };
  else
    return {
      classificacao: "Obesidade grau III (grave)",
      dica: "Procure acompanhamento médico urgente.",
      cor: "#f44336",
    };
};

// Função 3 — Validar entradas
const validarEntradas = (peso, altura) => {
  if (!peso || !altura) return false;
  if (isNaN(peso) || isNaN(altura)) return false;
  if (peso <= 0 || altura <= 0) return false;
  return true;
};

// Função 4 — Formatar resultado
const formatarResultado = (imc, classificacao) => {
  return `Seu IMC é ${imc} (${classificacao})`;
};

describe("Função calcularIMC", () => {
  it("deve calcular corretamente o IMC", () => {
    expect(calcularIMC(70, 170)).toBe(24.22);
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

describe("Função gerarClassificacaoEDica", () => {
  it("deve retornar 'Abaixo do peso' para IMC 17", () => {
    const r = gerarClassificacaoEDica(17);
    expect(r.classificacao).toBe("Abaixo do peso");
  });

  it("deve retornar 'Peso normal' para IMC 23", () => {
    const r = gerarClassificacaoEDica(23);
    expect(r.classificacao).toBe("Peso normal");
  });

  it("deve retornar 'Sobrepeso' para IMC 27", () => {
    const r = gerarClassificacaoEDica(27);
    expect(r.classificacao).toBe("Sobrepeso");
  });

  it("deve retornar 'Obesidade grau III (grave)' para IMC 42", () => {
    const r = gerarClassificacaoEDica(42);
    expect(r.classificacao).toBe("Obesidade grau III (grave)");
  });
});

describe("Função validarEntradas", () => {
  it("deve retornar true para valores válidos", () => {
    expect(validarEntradas(70, 170)).toBe(true);
  });

  it("deve retornar false se peso for vazio", () => {
    expect(validarEntradas("", 170)).toBe(false);
  });

  it("deve retornar false se altura for negativa", () => {
    expect(validarEntradas(70, -180)).toBe(false);
  });
});

describe("Função formatarResultado", () => {
  it("deve formatar corretamente a string de resultado", () => {
    expect(formatarResultado(24.2, "Peso normal")).toBe(
      "Seu IMC é 24.2 (Peso normal)"
    );
  });
});
