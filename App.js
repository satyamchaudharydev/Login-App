import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext } from 'react';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor}) => {
          const { logout } = useContext(AuthContext);
          return (
            <IconButton icon="exit" onPress={logout}  color={tintColor}
            size={24} />
          );
        }
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { token } = useContext(AuthContext);
  return (
        <NavigationContainer>
            {
              !token && <AuthStack />
            }
            {
                token && <AuthenticatedStack />
            }
        </NavigationContainer>
  
  );
}

export default function App() {
  return (
    <>
        <AuthContextProvider>
          <StatusBar style="light" />
          <Navigation />
      </AuthContextProvider>

    </>
  );
}
