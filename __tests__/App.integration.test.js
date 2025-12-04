// __tests__/App.integration.test.js

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const MockDialog = ({ children, visible }) => (visible ? React.createElement(React.Fragment, null, children) : null);
  MockDialog.Content = ({ children }) => React.createElement(React.Fragment, null, children);
  MockDialog.Actions = ({ children }) => React.createElement(React.Fragment, null, children);
  MockDialog.Title = ({ children }) => React.createElement(React.Fragment, null, children);

  const MockButton = ({ onPress, children, testID }) =>
    React.createElement(Text, { onPress, testID }, children);

  const MockParagraph = ({ children }) => React.createElement(React.Fragment, null, children);

  // Aqui: sempre renderiza o texto, ignorando "visible"
  const MockSnackbar = ({ children }) => React.createElement(Text, null, children);

  return {
    Provider: ({ children }) => children,
    Portal: ({ children }) => children,
    Dialog: MockDialog,
    Button: MockButton,
    Paragraph: MockParagraph,
    Snackbar: MockSnackbar,
  };
});

// Imports do App e testing library
import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";

describe("Integração da Calculadora de IMC com Dialog", () => {
  it("exibe resultado correto ao preencher peso e altura", () => {
    const { getByTestId, queryByText } = render(<App />);
    fireEvent.changeText(getByTestId("input-peso"), "70");
    fireEvent.changeText(getByTestId("input-altura"), "170");
    fireEvent.press(getByTestId("button-calcular"));
    expect(queryByText(/Seu IMC:/i)).not.toBeNull();
  });

  it("exibe aviso se campos estiverem vazios", () => {
    const { getByTestId, queryByText } = render(<App />);
    fireEvent.press(getByTestId("button-calcular"));
    expect(queryByText(/Preencha todos os campos!/i)).not.toBeNull();
  });

  it("exibe aviso se altura for zero", () => {
    const { getByTestId, queryByText } = render(<App />);
    fireEvent.changeText(getByTestId("input-peso"), "70");
    fireEvent.changeText(getByTestId("input-altura"), "0");
    fireEvent.press(getByTestId("button-calcular"));
    expect(queryByText(/A altura precisa ser maior que zero!/i)).not.toBeNull();
  });

  it("fecha o Dialog ao clicar em 'Fechar'", () => {
    const { getByTestId, queryByText } = render(<App />);
    fireEvent.changeText(getByTestId("input-peso"), "60");
    fireEvent.changeText(getByTestId("input-altura"), "160");
    fireEvent.press(getByTestId("button-calcular"));
    fireEvent.press(getByTestId("button-fechar"));
    expect(queryByText(/Seu IMC:/i)).toBeNull();
  });
});
