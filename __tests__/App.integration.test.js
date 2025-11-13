import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import App from "../App";

// Mock do Toastify — impede o Jest de quebrar e permite verificar se ele foi chamado
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
  ToastContainer: () => null, // evita tentar renderizar o componente real
}));

describe("Integração da Calculadora de IMC", () => {
  it("exibe resultado correto ao preencher peso e altura", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    // Usuário digita peso e altura válidos
    fireEvent.changeText(getByPlaceholderText("Digite seu peso (kg)"), "70");
    fireEvent.changeText(getByPlaceholderText("Digite sua altura (cm)"), "170");

    // Usuário clica no botão Calcular
    fireEvent.press(getByText("Calcular"));

    // Aguarda o modal aparecer com o resultado
    await waitFor(() => {
      expect(queryByText(/Seu IMC é/)).toBeTruthy();
      expect(queryByText("Peso normal")).toBeTruthy();
    });
  });

  it("exibe aviso se campos estiverem vazios", async () => {
    const { getByText } = render(<App />);
    const { toast } = require("react-toastify");

    // Usuário tenta calcular sem preencher nada
    fireEvent.press(getByText("Calcular"));

    // Verifica se o aviso (toast.warn) foi chamado
    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("Preencha todos os campos!");
    });
  });

  it("exibe aviso se altura for zero ou inválida", async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const { toast } = require("react-toastify");

    // Usuário digita peso mas altura = 0
    fireEvent.changeText(getByPlaceholderText("Digite seu peso (kg)"), "70");
    fireEvent.changeText(getByPlaceholderText("Digite sua altura (cm)"), "0");

    fireEvent.press(getByText("Calcular"));

    // Espera o toast de erro ser exibido
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("A altura precisa ser maior que zero!");
    });
  });

  it("fecha o modal ao clicar em 'Fechar'", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    // Preenche os campos
    fireEvent.changeText(getByPlaceholderText("Digite seu peso (kg)"), "60");
    fireEvent.changeText(getByPlaceholderText("Digite sua altura (cm)"), "160");

    fireEvent.press(getByText("Calcular"));

    // Espera o modal aparecer
    await waitFor(() => {
      expect(queryByText(/Seu IMC é/)).toBeTruthy();
    });

    // Fecha o modal
    fireEvent.press(getByText("Fechar"));

    // Espera o modal sumir
    await waitFor(() => {
      expect(queryByText(/Seu IMC é/)).toBeFalsy();
    });
  });
});
