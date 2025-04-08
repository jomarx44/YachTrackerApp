import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import YachtSearchScreen from '../screens/Yacht/YachtSearchScreen';
import YachtDetailModalScreen from '../screens/Yacht/YachtDetailModalScreen';
import { RootStackParamList } from 'types/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='YachtSearch' component={YachtSearchScreen}/>
        <Stack.Screen name='YachtDetails' component={YachtDetailModalScreen} options={{presentation:'modal', headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}