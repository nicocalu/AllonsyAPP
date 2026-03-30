import { Redirect } from 'expo-router';
import { useStore } from '../src/store/useStore';

export default function Index() {
  const { isAuthenticated, hasSeenOnboarding, mode } = useStore();

  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Route to the correct mode directory
  if (mode === 'sender') {
    return <Redirect href="/(app)/(sender)" />;
  } else {
    return <Redirect href="/(app)/(driver)" />;
  }
}