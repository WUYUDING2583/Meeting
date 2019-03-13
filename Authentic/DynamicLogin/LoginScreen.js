import React, { Component } from 'react';
import Styles, { backgourndColor } from "../../Style";
import { View, Text } from 'react-native';
import { TouchableOpacity, TextInput, Alert } from 'react-native';
import Back from "../../Component/Back";
import Forward from "../../Component/Forward";
import Button from '../../Component/Button';
import url from "../../url";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import Global, { personType } from "../../Global";

//游客动态密码登录页面
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,//倒计时
            text: '',//用户输入的验证码
            code: '-^&*()$@',//验证码
            phone: '',//用户手机号
            x: 0,//底部元素相对于屏幕左上顶点的坐标，
            y: 0,//用于keyboardawarescrollview出现的空白区域调整
            screenHeight: Global.gScreen.screen_height,
            data: null,//用户个人信息
            isGetInfo: false,//是否已经获取到用户信息
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

    //跳转页面
    navigate = () => {
        // this.props.navigation.navigate("App");
        let { text, code, phone } = this.state;
        if (text.length === 0 || phone.length === 0) {
            this.refs.toast.show("先把信息输入完整哦");
        } else {
            if (text.localeCompare(code) === 0) {
                Global.storage.save({
                    key: 'personInfo',  // 注意:请不要在key中使用_下划线符号!
                    data: this.state.data,
                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: 1000 * 3600 * 24 * 7
                });
                this.props.navigation.navigate("App");
            } else {
                this.refs.toast.show("验证码错误");
            }
        }
    }

    verifyVisitor = () => {
        Global.phone = this.state.phone;
        Global.storage.save({
            key: 'phone',  // 注意:请不要在key中使用_下划线符号!
            data: this.state.phone,
            expires: 1000 * 3600 * 24 * 7
        });
        let URL = url.verifyVisitor(this.state.phone);
        let opts = {
            method: "GET"
        }
        // fetch(URL, opts).then((response) => response.json())
        //     .then((responseJson) => {
        //         if (responseJson.status === 200) {
        //             if ("success".localeCompare(responseJson.result) === 0) {
        //                 this.setState({
        //                     data: { ...responseJson.data, personType: personType.visitor },
        //                     isGetInfo: true
        //                 });
        //                 this.sendVerifyCode();
        //             } else {
        //                 this.refs.toast.show(responseJson.msg);
        //             }
        //         } else {
        //             this.refs.toast.show(responseJson.msg);
        //         }
        //     }).catch((error) => this.refs.toast.show("网络似乎在躲猫猫欸"))
        this.sendVerifyCode();
    }

    sendVerifyMsg = () => {
        let opts = {
            method: "GET"
        }
        let URL = url.sendVerifyMsg(this.state.phone);
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                //alert(response.json());
                if (responseJson.status === 200) {
                    this.setState({ code: responseJson.data });
                }
            }).catch((error) => this.refs.toast.show("网络似乎在躲猫猫欸"))
        console.log(URL);
    }

    returnFace = () => {
        Alert.alert('很抱歉，没有认出你', '第一次登录请使用其他登录方式', [
            {
                text: '再试一次', onPress: () => {
                    this.props.navigation.push("FaceCognition", {
                        personType: personType.visitor,
                        phone: this.state.phone,
                        return: this.returnFace,
                    })
                }
            },
            {
                text: '其他方式登录',
            },
        ]);
    }

    toFace = () => {
        if (this.state.phone.length > 0) {
            this.props.navigation.push("FaceCognition", {
                personType: personType.visitor,
                phone: this.state.phone,
                return: this.returnFace,
            });
        } else {
            this.refs.toast.show("先输入手机号哦");
        }
    }
    sendVerifyCode = () => {
        this.setState({ seconds: 60 });
        this.coundtDown();
        this.sendVerifyMsg();
    }
    componentWillMount() {
        this.setState({ phone: Global.phone });
    }
    componentDidMount() {
        this.coundtDown();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    onLayout = (e) => {
        let { x, y } = e.nativeEvent.layout;
        this.setState({ x: x, y: y });
    }
    render() {
        let { y, screenHeight } = this.state;
        return (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={Styles.default}>
                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                        <Back onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }}>
                        <Text style={Styles.title}>手机动态密码登录</Text>
                        <Text style={Styles.itemTitle}>请输入手机号</Text>
                        <TextInput style={Styles.input} keyboardType="number-pad"
                            value={this.state.phone}
                            onChangeText={(phone) => this.setState({ phone })} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                            <Text style={Styles.itemTitle}>4位验证码</Text>
                            <TouchableOpacity onPress={this.state.seconds <= 0 ? this.state.isGetInfo ? this.sendVerifyCode : this.verifyVisitor : null}>
                                <Text style={Styles.itemTitle}>{this.state.seconds <= 0 ? "获取验证码" : this.state.seconds + "s"}</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={Styles.input} keyboardType="number-pad" onChangeText={(text) => this.setState({ text })} />
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            <Text style={{ color: "white", fontSize: 15, marginRight: 20, marginLeft: 20 }}>第一次登录请使用短信验证码登录</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", height: (screenHeight - y - 24) }}
                            onLayout={this.onLayout}>
                            <View style={{ flex: 1, flexDirection: "column-reverse", alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={this.toFace}>
                                    <Text style={Styles.iconTitle}>人脸识别登录</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 1, flexDirection: "column-reverse",
                                alignItems: "flex-end"
                            }} >
                                <Forward onPress={this.navigate}
                                    feasible={this.state.text.length > 3} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} />
                </View >
                <Toast
                    ref="toast"
                    style={Styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: backgourndColor, fontSize: 20, fontWeight: "bold" }}
                />
            </KeyboardAwareScrollView>
        )
    }
}
export default LoginScreen;