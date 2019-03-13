import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Styles from "../Style";
import Back from "../Component/Back";

class ForgetPswScreen extends Component {
    render() {
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Back onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }}>
                    <Text>找回密码使用人脸识别还是验证码</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        );
    }
}

export default ForgetPswScreen;