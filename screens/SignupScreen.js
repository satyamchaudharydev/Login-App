import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const {authenticate} = useContext(AuthContext)
  async function signupHandler({email,password}){
    setIsLoaded(true);
    try {
      const token = await createUser({email,password})
      authenticate(token)
      // navigation.replace('Welcome')

    } catch (error) {
      Alert.alert("An error occured", "Please try again later")
      setIsLoaded(false);

    }
  }
  if(isLoaded){
    return <LoadingOverlay message={"loading"} />
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
