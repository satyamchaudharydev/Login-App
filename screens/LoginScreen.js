import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const {authenticate} = useContext(AuthContext)
  async function loginHandler({email,password}){
    setIsLoaded(true);
    try {
      const token = await login({email,password})
      authenticate(token)
    } catch (error) {
        Alert.alert("Error", error.message)
        setIsLoaded(false);

    }
  }

  if(isLoaded){
    return <LoadingOverlay message={"Loging you in.."} />
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
