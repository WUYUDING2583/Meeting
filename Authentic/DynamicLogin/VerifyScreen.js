import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Styles from '../../Style';
import Back from "../../Component/Back";
import url from "../../url";
import Forward from "../../Component/Forward";
import Global, { personType } from "../../Global";

//游客输入验证码页面
class VerifyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 60,//倒计时
            text: "",//用户输入验证码
            code: "",//系统验证码
            phone: "",//用户电话
            name: "",//用户姓名
            sex:"",
        };
    }

    //倒计时函数
    coundtDown = () => {
        this.timer = setInterval(() => {
            let seconds = this.state.seconds;
            this.setState({ seconds: seconds - 1 });
            if (this.state.seconds <= 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    sendVerifyMsg = () => {
        let opts = {
            method: "GET"
        }
        let URL = url.sendVerifyMsg(this.state.phone);
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    this.setState({ code: responseJson.data });
                }
            }).catch((error) => this.ref.toast.show("网络似乎在躲猫猫"))
    }

    componentWillMount() {
        let phone = this.props.navigation.getParam('phone', '');
        let name = this.props.navigation.getParam('name', '');
        let sex = this.props.navigation.getParam('sex', '');
        this.setState({ phone, name,sex });
    }
    //组件挂载时开始倒计时
    componentDidMount() {
        this.coundtDown();
        this.sendVerifyMsg();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    //重新发送验证码
    sendVerifyCode = () => {
        this.setState({ seconds: 60 });
        this.coundtDown();
        this.sendVerifyMsg();
    }
    register = () => {
        let opts = {
            method: "POST",
            body: {
                name: this.state.name,
                phone: this.state.phone,
                sex:this.state.sex,
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        fetch(url.visitorRegister(), opts).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    if ("success".localeCompare(responseJson.result) === 0) {
                        Global.personInfo = { ...responseJson.data, personType: personType.visitor };
                        Global.storage.save({
                            key: 'personInfo',  // 注意:请不要在key中使用_下划线符号!
                            data: Global.personInfo,
                            expires: 1000 * 3600 * 24 * 7
                        });
                    }
                }
            })
    }
    navigate = () => {
        let { text, code } = this.state;
        if (text.localeCompare(code) === 0) {
            this.props.navigation.navigate("App");
        } else {
            alert("验证码输入错误");
        }
    }
    render() {
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Back onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }}>
                    <Text style={Styles.title}>输入4位验证码</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                        <Text style={Styles.itemTitle}>4位验证码</Text>
                        <TouchableOpacity onPress={this.state.seconds <= 0 ? this.sendVerifyCode : null}>
                            <Text style={Styles.itemTitle}>{this.state.seconds <= 0 ? "重新获取" : this.state.seconds + "s"}</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput style={Styles.input} keyboardType="number-pad" onChangeText={(text) => this.setState({ text })} />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column-reverse", alignItems: "flex-end" }}>
                            <Forward onPress={this.register}
                                feasible={this.state.text.length > 3} />
                        </View>
                    </View>
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
        )
    }
}

export default VerifyScreen;