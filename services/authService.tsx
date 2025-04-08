
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { CLIENT_ID, REDIRECT_URI, ENDPOINTS } from 'constant/endpoints';
const discovery = {
  authorizationEndpoint: ENDPOINTS.authorizationEndpoint,
  tokenEndpoint: ENDPOINTS.tokenEndpoint
};

export async function loginWithOAuth2(): Promise<string> {
  const redirectUri = REDIRECT_URI
  const request = new AuthSession.AuthRequest({
    clientId: CLIENT_ID,
    redirectUri,
    scopes: ['API'],
    responseType: AuthSession.ResponseType.Code,
    usePKCE: true,
  });
  await request.makeAuthUrlAsync(discovery)
  const result = await request.promptAsync(discovery) as AuthSession.AuthSessionResult;

  if (result.type === 'success' && result.params.code) {
    const code = result.params.code;
    const tokenResponse = await AuthSession.exchangeCodeAsync(
      {
        clientId: CLIENT_ID,
        redirectUri,
        code,
        extraParams: {
          grant_type: 'authorization_code',
          code_verifier: request.codeVerifier || '',
        }
      }, discovery
    );
    await SecureStore.setItemAsync('token', tokenResponse.accessToken);
    return tokenResponse.accessToken;
  }
  throw new Error('Failed to login');
};