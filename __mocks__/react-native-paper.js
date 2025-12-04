import React from 'react';
import { View, Text, Pressable } from 'react-native';

// Mock de Portal
export const Portal = ({ children }) => <>{children}</>;

// Mock de Dialog
export const Dialog = ({ visible, onDismiss, children }) => (
  visible ? <View>{children}</View> : null
);

// Subcomponentes de Dialog
Dialog.Content = ({ children }) => <View>{children}</View>;
Dialog.Actions = ({ children }) => <View>{children}</View>;

// Mock de Button
export const Button = ({ onPress, children, testID }) => (
  <Pressable onPress={onPress} testID={testID}>
    <Text>{children}</Text>
  </Pressable>
);

// Mock de TextInput
export const TextInput = ({ value, onChangeText, testID }) => (
  <Pressable testID={testID} onPress={() => {}}>
    <Text>{value}</Text>
  </Pressable>
);

export const Text = ({ children }) => <>{children}</>;
