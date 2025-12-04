// jest-setup.js

// React Native Gesture Handler
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: 'view',
  PanGestureHandler: 'view',
  TapGestureHandler: 'view',
  LongPressGestureHandler: 'view',
  State: {},
}));

// React Native Paper
jest.mock('react-native-paper', () => ({
  Provider: 'view',
  Portal: 'view',
  Snackbar: 'view',
  Modal: 'view',
  Button: 'view',
  TextInput: 'input',
  Text: 'text',
}));

// Se quiser ignorar warnings do Animated (opcional, dependendo da versão)
try {
  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
} catch {}
