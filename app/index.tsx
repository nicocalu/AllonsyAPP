import { Redirect } from 'expo-router';
import { useStore } from '../src/store/useStore';

export default function Index() {
  const { isAuthenticated, mode } = useStore();

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