import React, { Component } from "react";
import { View, Text, CameraRoll, TouchableWithoutFeedback } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Styles, { backgourndColor } from "../Style";
import ViewShot, { captureScreen, captureRef } from "react-native-view-shot";
import Global from "../Global";
import Button from "../Component/Button";
import Toast from 'react-native-easy-toast';
import  { QRCType } from "../url";

class InviteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSave: true,
            data: JSON.stringify({ msg:"下载智会议app扫一扫加入群组",type:QRCType.invite,code: this.props.navigation.getParam("groupId", -1) }),
        }
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
        let { data } = this.state;
        return (
            <View style={{ flex: 1, alignItems: "stretch", flexDirection: "row", backgroundColor: "#FAFAFA" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }} />
                <View style={{ flex: 8, backgroundColor: "#FAFAFA", alignItems: "stretch", flexDirection: "column" }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 4, flexDirection: "column" }}>
                        <View style={{ alignItems: "center" }}>
                            <ViewShot ref="qrcode">
                                <View style={{ justifyContent: "center", alignItems: "center", padding: 30 }}>
                                    <QRCode value={data} size={Global.gScreen.screen_width * 0.6} />
                                    <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>分享二维码</Text>
                                    <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>打开智会议app扫一扫</Text>
                                    <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>可邀请他人加入群组</Text>
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
            </View>
        )
    }
}

export default InviteScreen;