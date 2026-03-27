import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '@/src/store/useStore';

export default function OnboardingScreen() {
  const completeOnboarding = useStore((state) => state.completeOnboarding);

  const handleContinue = () => {
    completeOnboarding();
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/splash-icon.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <Text style={styles.title}>Welcome to Allons-Y</Text>
        <Text style={styles.description}>
          Allons-Y connects senders and drivers in one simple place so deliveries stay organized,
          clear, and on time.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Let's go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  image: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '700',
    color: '#082a56',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2f3540',
    textAlign: 'center',
    maxWidth: 360,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#ed176e',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
