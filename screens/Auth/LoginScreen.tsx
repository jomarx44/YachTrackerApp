import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from 'constant/colors';
import { Strings } from 'constant/strings';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { loginWithOAuth2 } from 'services/authService';
import { RootStackParamList } from 'types/type';
import * as SecureStore from 'expo-secure-store';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginWithOAuth2();
      if (token) {
        navigation.replace('YachtSearch');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginText}>{Strings.loginText}</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        <Button
          title={Strings.loginButton}
          onPress={handleLogin}
        />
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 40,
    color: colors.secondary,
    marginBottom: 20
  }
});
