import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import App from "../App";

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text, TextInput } = require("react-native");

  const MockDialog = ({ children }) => <>{children}</>;
  MockDialog.Content = ({ children }) => <>{children}</>;
  MockDialog.Actions = ({ children }) => <>{children}</>;
  MockDialog.Title = ({ children }) => <>{children}</>;

  const MockSnackbar = ({ children, visible }) =>
    visible ? <Text>{children}</Text> : null;

  return {
    Provider: ({ children }) => <>{children}</>,
    Portal: ({ children }) => <>{children}</>,
    Button: (props) => <Text onPress={props.onPress}>{props.children}</Text>,
    TextInput,
    Dialog: MockDialog,
    Snackbar: MockSnackbar,
    Text,
  };
});

describe("Testes da Calculadora de IMC", () => {
  test("deve calcular o IMC corretamente", () => {
    const { getByTestId, getByText } = render(<App />);

    fireEvent.changeText(getByTestId("input-peso"), "68");
    fireEvent.changeText(getByTestId("input-altura"), "1.70");
    fireEvent.press(getByTestId("button-calcular"));

    expect(getByText(/Resultado/i)).toBeTruthy();
    expect(getByText(/23\.5/)).toBeTruthy();
  });

  test("deve exibir mensagem de erro se campos estiverem vazios", async () => {
    const { getByTestId, findByText } = render(<App />);

    await act(async () => {
      fireEvent.changeText(getByTestId("input-peso"), "");
      fireEvent.changeText(getByTestId("input-altura"), "");
      fireEvent.press(getByTestId("button-calcular"));
    });

    await waitFor(async () => {
      expect(await findByText(/preencha todos os campos/i)).toBeTruthy();
    });
  });
}); // <-- FALTAVA