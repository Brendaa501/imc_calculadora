// __tests__/App.system.test.js

// Mock local de react-native-paper apenas para este teste
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const MockDialog = ({ children, visible }) =>
    visible ? React.createElement(React.Fragment, null, children) : null;
  MockDialog.Content = ({ children }) => React.createElement(React.Fragment, null, children);
  MockDialog.Actions = ({ children }) => React.createElement(React.Fragment, null, children);
  MockDialog.Title = ({ children }) => React.createElement(React.Fragment, null, children);

  const MockButton = ({ children, onPress, testID }) =>
    React.createElement(Text, { onPress, testID }, children);

  const MockSnackbar = ({ children, visible }) =>
    visible ? React.createElement(Text, null, children) : null;

  return {
    Provider: ({ children }) => children,
    Portal: ({ children }) => children,
    Dialog: MockDialog,
    Button: MockButton,
    Snackbar: MockSnackbar,
  };
});

// Agora importa o App **após o mock local**
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('Teste de Sistema - Calculadora IMC', () => {
  it('Deve calcular IMC corretamente e mostrar modal com resultados', async () => {
    const { getByTestId, queryByText } = render(<App />);
    fireEvent.changeText(getByTestId('input-peso'), '70');
    fireEvent.changeText(getByTestId('input-altura'), '170');
    fireEvent.press(getByTestId('button-calcular'));

    expect(queryByText(/Seu IMC:/i)).not.toBeNull();
  });

  it('Deve mostrar snackbar quando campos vazios', async () => {
    const { getByTestId, queryByText } = render(<App />);
    fireEvent.press(getByTestId('button-calcular'));
    expect(queryByText(/Preencha todos os campos!/i)).not.toBeNull();
  });

  it('Deve mostrar snackbar quando valores inválidos', async () => {
    const { getByTestId, queryByText } = render(<App />);
    fireEvent.changeText(getByTestId('input-peso'), 'abc');
    fireEvent.changeText(getByTestId('input-altura'), '-1');
    fireEvent.press(getByTestId('button-calcular'));
    expect(queryByText(/Digite apenas números válidos!/i)).not.toBeNull();
  });
});
