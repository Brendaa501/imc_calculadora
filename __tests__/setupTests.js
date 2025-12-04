import '@testing-library/jest-native/extend-expect';

// Mock do react-native-reanimated
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

// Mock do gesture handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: View,
  };
});

// Mock para react-native-vector-icons usados pelo Paper
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// Opcional: suprimir warnings
jest.spyOn(global.console, 'warn').mockImplementation(() => {});
