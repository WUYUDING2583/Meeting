import React, { Component } from "react";
import { View, Text, Dimensions, CameraRoll, TouchableWithoutFeedback } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot, { captureScreen, captureRef } from "react-native-view-shot";
import Button from "../../../Component/Button";
import Styles from "../../../Style";
import Toast from 'react-native-easy-toast';
import url, { QRCType } from "../../../url";
import Loading from "../../../Component/Loading";
import NoInternetScreen from "../../NoInternetScreen";
import Forward from "../../../Component/Forward";

class ReservationCompleteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isGetting: false,//是否正在获取到数据
            isNet: true,//是否能够连接到网络
            isSave: true,//能否保存照片
        }
    }

    getQRCode = () => {
        this.setState({ isGetting: true, isNet: true });
        let data = this.props.navigation.getParam("data", {});
        let opts = {
            method: "POST",   //请求方法
            body: data,   //请求体
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        fetch(url.makeReservationStaff(), opts).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    let code = responseJson.data;
                    let type = QRCType.meeting;
                    data = { code, type }
                    this.setState({ data: JSON.stringify(data) });
                }
                this.setState({ isGetting: false });
            }).catch(() => {
                this.setState({ isNet: false });
            })
    }
    componentWillMount() {
        // this.getQRCode();
        let code = 13;
        let type = QRCType.meeting;
        data = { code, type }
        this.setState({ data: JSON.stringify(data), isGet: true });
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
        let { width, height } = Dimensions.get("window");
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
                                        <QRCode value={data} size={width * 0.6} />
                                    </ViewShot>
                                </View>
                                <Button title="保存二维码并返回" onPress={this.snapshot} textStyle={{ ...Styles.appButtonText }}
                                    background={{ ...Styles.appButtonContainer }} />
                                <View style={{ flex: 1, marginTop: 10, flexDirection: "column", alignItems: "center",justifyContent:"center" }}>
                                    <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>分享二维码</Text>
                                    <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>可邀请他人加入会议</Text>
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
}

export default ReservationCompleteScreen;