import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from "./Stack/AuthStack";
import TabNavigator_Staff from "./Stack/AppStack";
import Global from "./Global";


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    //this._bootstrapAsync();
  }

  // Fetch the token from Global.storage then navigate to our appropriate place
  componentDidMount() {
    Global.storage.load({
      key: 'phone',
      autoSync: false,
      syncInBackground: false,
    }).then(ret => {
      Global.phone = ret;
    }).catch((err)=>console.log("phone"+err))
    
    Global.storage.load({
      key: 'personInfo',
      autoSync: false,
      syncInBackground: false,
    }).then(ret => {
      Global.personInfo = ret;
      this.props.navigation.navigate(Global.personInfo ? 'App' : 'Auth');
    }).catch((err)=>{
      console.log("personInfo"+err)
      this.props.navigation.navigate("Auth");
    })


  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator_Staff,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
  }
));
