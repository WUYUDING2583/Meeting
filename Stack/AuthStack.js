import { createStackNavigator } from 'react-navigation';
import InitScreen from "../Authentic/InitScreen";
import LoginScreen from "../Authentic/DynamicLogin/LoginScreen";
import VerifyScreen from "../Authentic/DynamicLogin/VerifyScreen";
import InstitutionInitScreen from "../Authentic/InstitutionLogin/InstitutionInitScreen";
import ForgetPswScreen from "../Authentic/ForgetPswScreen";
import FaceCognitionLoginScreen from "../Authentic/FaceCognitionLogin";
import InstitutionPswScreen from "../Authentic/InstitutionLogin/InstitutionPswScreen";
import NamePhoneScreen from '../Authentic/CreateAccount/NamePhoneScreen';
import NoInternetScreen from '../Authentic/NoInternetScreen';
import TestScreen from "../Authentic/TestScreen";

const AuthStack = createStackNavigator(
    {
        // Test: TestScreen,
        Init: InitScreen,
        Login: LoginScreen,
        Verify: VerifyScreen,
        Institution: InstitutionInitScreen,
        InstitutionPsw: InstitutionPswScreen,
        ForgetPsw: ForgetPswScreen,
        FaceCognition: FaceCognitionLoginScreen,
        NamePhone: NamePhoneScreen,
        NoInternet: NoInternetScreen,
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
export default AuthStack;