import PrivacyPolicyModal from '@/components/PrivacyPolicyModal';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [policyAccepted, setPolicyAccepted] = useState<boolean | null>(null);
  const [showDeclined, setShowDeclined] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPolicyAccepted(false);
  }, []);

  const handleAccept = async () => {
    setPolicyAccepted(true);
    if (showDeclined) {
      setShowDeclined(false);
      router.replace('/');
    } else {
      setShowDeclined(false);
    }
  };

  const handleDecline = async () => {
    setShowDeclined(true);
  };

  if (!loaded || policyAccepted === null) {
    return null;
  }

  if (showDeclined) {
    return (
      <View style={styles.blockedContainer}>
        <Text style={styles.blockedText}>Blz então, pdp</Text>
      </View>
    );
  }

  if (policyAccepted === false) {
    return (
      <PrivacyPolicyModal
        visible={true}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  blockedContainer: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockedText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 24,
  },
});
