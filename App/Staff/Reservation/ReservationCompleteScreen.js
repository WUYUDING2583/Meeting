import React, { Component } from "react";
import { View, Text, Dimensions, CameraRoll, TouchableWithoutFeedback, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot, { captureScreen, captureRef } from "react-native-view-shot";
import Button from "../../../Component/Button";
import Styles from "../../../Style";
import Toast from 'react-native-easy-toast';
import url, { QRCType } from "../../../url";
import Loading from "../../../Component/Loading";
import NoInternetScreen from "../../NoInternetScreen";
import Forward from "../../../Component/Forward";
import Global from "../../../Global";
import NotifService from "../../../Component/NotifyService";
import { tabName } from "../../../Stack/AppStack";

let appConfig = {
    "name": "example",
    "displayName": "React Native Push Notification Example",
    "senderID": "YOUR-GCM-ID"
}

class ReservationCompleteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            isGetting: false,//是否正在获取到数据
            isNet: true,//是否能够连接到网络
            isSave: true,//能否保存照片
            senderId: appConfig.senderID,
        }
        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

    //设置消息推送
    setMessagePut = (data) => {
        console.log(data);
        let reg = new RegExp("-", 'gm');
        date = new Date(data.start_time.replace(reg, "/")).getTime() - (1000 * 60 * 10 * 3);
        console.log(date);
        let opt = {
            date: new Date(date),
            title: "您30分钟后有一场会议待参加", // (optional)
            message: "点击查看详情", // (required)
            playSound: true, // (optional) default: true
            soundName: 'default',
        }
        this.notif.scheduleNotif(opt);
    }


    componentWillMount() {
        let code = this.props.navigation.getParam("code", -1);
        let data = this.props.navigation.getParam("data", {});
        // let data = this.props.navigation.getParam("data", {});
        // console.log(data);
        this.setMessagePut(data);
        let type = QRCType.meeting;
        let dat = { mes: "下载智会议app和大家一起加入会议吧d=====(￣▽￣*)b", code, type }
        this.setState({ data: JSON.stringify(dat) });
    }

    snapshot = () => {
        this.refs.qrcode.capture().then(uri => {
            CameraRoll.saveToCameraRoll(uri, "photo").then(
                (url) => {
                    this.props.navigation.popToTop();
                }
            ).catch(
                () => {
                    this.refs.toast.show("（＞人＜；）由于某种原因照片保存失败，请手动保存");
                    this.setState({ isSave: false });
                }
            )

        })
    }

    render() {
        let width = Global.gScreen.screen_width;
        let { data } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {this.state.isNet ? this.state.isGetting ? <Loading /> :
                    <View style={{ flex: 1, alignItems: "stretch", flexDirection: "row", backgroundColor: "#FAFAFA" }}>
                        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }} />
                        <View style={{ flex: 8, backgroundColor: "#FAFAFA", alignItems: "stretch", flexDirection: "column" }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 4, flexDirection: "column" }}>
                                <View style={{ alignItems: "center" }}>
                                    <ViewShot ref="qrcode">
                                        <View style={{ padding: 20,justifyContent:"center",alignItems:"center" }}>
                                            <QRCode
                                                value={data}
                                                logo={require("../../../Component/icon.png")}
                                                logoSize={width * 0.2}
                                                size={width * 0.6} />
                                            <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>分享二维码</Text>
                                            <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>打开智会议app</Text>
                                            <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>邀请他人加入会议</Text>
                                        </View>
                                    </ViewShot>
                                </View>
                                <Button title="保存二维码并返回" onPress={this.snapshot} textStyle={{ ...Styles.appButtonText }}
                                    background={{ ...Styles.appButtonContainer }} />
                                <View style={{ flex: 1, marginTop: 10, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                                    {this.state.isSave ? null :
                                        <TouchableWithoutFeedback onPress={() => {
                                            this.props.navigation.popToTop()
                                        }}>
                                            <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>戳这里返回(づ￣ 3￣)づ</Text>
                                        </TouchableWithoutFeedback>
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 1 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }} />
                        <Toast ref="toast" opacity={0.8} fadeOutDuration={1000} />
                    </View> : <NoInternetScreen onPress={this.getQRCode} />
                }
            </View>
        )
    }

    onRegister(token) {
        Alert.alert("Registered !", JSON.stringify(token));
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif(notif) {
        Alert.alert(notif.title, notif.message, [
            {
                text: '查看详情',
                onPress: () => {
                    this.props.navigation.navigate(tabName.Meeting);
                }
            },
        ]);
    }

    handlePerm(perms) {
        Alert.alert("Permissions", JSON.stringify(perms));
    }
}

export default ReservationCompleteScreen;