import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Button from "../Component/Button";
import Styles,{backgourndColor} from "../Style";
import RNExitApp from 'react-native-exit-app';
import Icon from "react-native-vector-icons/Ionicons"
import Toast from 'react-native-easy-toast';

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
                        onPress={() => this.refs.toast.show("游客功能还未完善请进入机构登录")} />
                    <Button title="创建账号" background={Styles.authButtonContainer}
                        textStyle={Styles.authButtonText}
                        onPress={() => this.refs.toast.show("游客该功能还未完善请进入机构登录")} />
                </View>
                <View style={{ flex: 1 }} />
                <Toast
                    ref="toast"
                    style={Styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: backgourndColor, fontSize: 20, fontWeight: "bold" }}
                />
            </View>
        );
    }
}

export default InitScreen;