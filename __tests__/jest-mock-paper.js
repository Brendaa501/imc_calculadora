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
