import React, { Component } from 'react';
import Styles from "../../Style";
import { View, Text } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native';
import Back from "../../Component/Back";
import Forward from "../../Component/Forward";
import Global, { personType } from "../../Global";
import url from "../../url";

class NamePhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            sex:"",
        };
    }

    //跳转页面
    navigate = () => {
        let { name, phone,sex } = this.state;
        if (name.length > 0 && phone.length > 0) {
            this.props.navigation.push("Verify", {
                phone: phone,
                name: name,
                sex:sex,
            });
        }
    }

    render() {
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Back onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }}>
                    <Text style={{ ...Styles.title, marginTop: 50, fontSize: 20, color: "white", fontWeight: "bold" }}>姓名 NAME</Text>
                    <TextInput style={Styles.input} onChangeText={(name) => this.setState({ name })} />
                    <Text style={{ ...Styles.title, marginTop: 40, fontSize: 20, color: "white", fontWeight: "bold" }}>性别 SEX</Text>
                    <TextInput style={Styles.input} onChangeText={(sex) => this.setState({ sex })} />
                    <Text style={{ ...Styles.title, marginTop: 40, fontSize: 20, color: "white", fontWeight: "bold" }}>手机号码 PHONE NUMBER</Text>
                    <TextInput style={Styles.input} keyboardType="number-pad"
                        onChangeText={(phone) => this.setState({ phone })} />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column-reverse", alignItems: "flex-end" }}>
                            <Forward onPress={this.navigate}
                                feasible={this.state.name.length > 0 && this.state.phone.length > 0} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        )
    }
}
export default NamePhoneScreen;