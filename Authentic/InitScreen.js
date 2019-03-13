import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Button from "../Component/Button";
import Styles from "../Style";
import RNExitApp from 'react-native-exit-app';
import Icon from "react-native-vector-icons/Ionicons"

class InitScreen extends Component {

    render() {
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => RNExitApp.exitApp()}>
                        <Icon name="ios-close" size={40} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 8, alignItems: "stretch", justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => this.props.navigation.push("Institution")}>
                        <Text style={{ ...Styles.itemTitle, margin: 10 }}>机构登录>></Text>
                    </TouchableOpacity>
                    <Button title="登录" background={Styles.authButtonfocusdContainer}
                        textStyle={Styles.authFocusedButtonText}
                        onPress={() => this.props.navigation.push("Login")} />
                    <Button title="创建账号" background={Styles.authButtonContainer}
                        textStyle={Styles.authButtonText}
                        onPress={() => this.props.navigation.push("NamePhone")} />
                </View>
                <View style={{ flex: 1 }} />
                </View>
                );
            }
        }
        
export default InitScreen;