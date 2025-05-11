/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: '#4CAF50',
    secondary: '#81C784',
    background: '#fff',
    card: '#f5f5f5',
    text: '#000',
    border: '#e0e0e0',
    success: '#4CAF50',
    error: '#f44336',
    disabled: '#9e9e9e',
    accent: '#4CAF50',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#4CAF50',
    secondary: '#81C784',
    background: '#1a1a1a',
    card: '#2a2a2a',
    text: '#fff',
    border: '#404040',
    success: '#4CAF50',
    error: '#f44336',
    disabled: '#757575',
    accent: '#4CAF50',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
