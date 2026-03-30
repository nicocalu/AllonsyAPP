import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native';
import { useStore } from '../../src/store/useStore';

export default function AppLayout() {
  const { mode, toggleMode, logout } = useStore();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          color: '#082a56',
          fontWeight: '700',
        },
        headerTintColor: '#ed176e',
        headerRight: () => (
          <Button 
            title={`Switch to ${mode === 'sender' ? 'Driver' : 'Sender'}`} 
            color="#ed176e"
            onPress={() => {
              toggleMode();
              router.replace(mode === 'sender' ? '/(app)/(driver)' : '/(app)/(sender)');
            }} 
          />
        ),
        headerLeft: () => (
          <Button 
            title="Logout" 
            color="#ed176e"
            onPress={() => {
              logout();
              router.replace('/(auth)/login');
            }} 
          />
        )
      }}
    >
      <Stack.Screen name="(sender)/index" options={{ title: 'Sender Dashboard' }} />
      <Stack.Screen name="(driver)/index" options={{ title: 'Driver Dashboard' }} />
    </Stack>
  );
}