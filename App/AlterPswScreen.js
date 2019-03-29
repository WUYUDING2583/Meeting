import React, { Component } from 'react';
import Styles, { backgourndColor } from "../Style";
import { View, Text } from 'react-native';
import { TextInput } from 'react-native';
import Back from "../Component/Back";
import Forward from "../Component/Forward";
import Button from "../Component/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';
import url from "../url";
import Toast from 'react-native-easy-toast';
import Global from "../Global";

class AlterPswScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffId: Global.personInfo.id,
            oldPass: "",
            newPass: "",
            newRePass: "",
            x: 0,//底部元素相对于屏幕左上顶点的坐标，
            y: 0,//用于keyboardawarescrollview出现的空白区域调整
            screenHeight: Global.gScreen.screen_height,
            data: null,//公司列表数据
            companyList: [],//公司列表未处理数据
        };
    }

    alter = () => {
        let { oldPass, newPass, newRePass } = this.state;
        if(oldPass.length===0||newPass.length===0||newRePass.length===0){
            this.refs.toast.show("输入框不能为空");
            return;
        }
        if (newPass.localeCompare(newRePass) != 0) {
            this.refs.toast.show("两次密码输入不一致");
        } else {
            let {staffId,oldPass,newPass}=this.state;
            let data={staffId,oldPass,newPass};
            console.log(data);
            let opt={
                method:"POST",
                headers: {
                    'Accept': 'application/json;charset=utf-8',
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            }
            fetch(url.alterPsw(),opt).then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                if(responseJson.status===200){
                    if("success".localeCompare(responseJson.result)===0){
                        this.props.navigation.state.params.toast(responseJson.msg);
                        this.props.navigation.goBack();
                    }else{
                        this.refs.toast.show(responseJson.msg);
                    }
                }else{
                    this.refs.toast.show("网络似乎出了问题");
                }
            }).catch((error)=>{
                console.log(error);
                this.refs.toast.show("网络似乎出了问题");
            })
        }
    }

    render() {
        let { y, screenHeight } = this.state;
        return (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={Styles.default}>
                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                        <Back onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }} >
                        <Text style={Styles.title}>修改密码</Text>
                        <Text style={Styles.itemTitle}>旧密码</Text>
                        <TextInput style={{ ...Styles.input }} secureTextEntry={true}
                            value={this.state.oldPass}
                            onChangeText={(oldPass) => this.setState({ oldPass })} />
                        <Text style={Styles.itemTitle}>新密码</Text>
                        <TextInput style={{ ...Styles.input, marginBottom: 20 }} secureTextEntry={true}
                            onChangeText={(newPass) => this.setState({ newPass })} />
                        <Text style={Styles.itemTitle}>确认新密码</Text>
                        <TextInput style={{ ...Styles.input, marginBottom: 20 }} secureTextEntry={true}
                            onChangeText={(newRePass) => this.setState({ newRePass })} />
                        <Button title="修改" onPress={this.alter}
                            background={Styles.authButtonfocusdContainer}
                            textStyle={Styles.authFocusedButtonText} />

                    </View>
                    <View style={{
                        flex: 1, height: (screenHeight - y - 24), flexDirection: "column-reverse",
                        alignItems: "flex-end"
                    }} onLayout={this.onLayout} />
                </View>
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
export default AlterPswScreen;