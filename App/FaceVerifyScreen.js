import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Styles from "../Style";
import Back from "../Component/Back";
import { RNCamera, FaceDetector } from "react-native-camera";
import Global, { personType } from "../Global";
import url from "../url";

//需要调用sdk通过照片传送
class FaceVerifyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: -1,
            data: null,
            isForgetPwd: false,
        };
    }

    componentWillMount() {
        let type = this.props.navigation.getParam("personType", -1);
        let isForgetPwd = this.props.navigation.getParam("isForgetPwd", false);
        this.setState({ type, isForgetPwd });
    }

    faceVerify = (faceInfo) => {
        Global.personInfo.identified=true;
        Global.storage.save({
            key: 'personInfo',  // 注意:请不要在key中使用_下划线符号!
            data: Global.personInfo,
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: 1000 * 3600 * 24 * 7
        });
        this.props.navigation.state.params.toast("人脸认证成功");
        this.props.navigation.goBack();
      

        // let formData = new FormData();// 把图片放入formData中,采用formData来实现

       
        // let params = { personId: Global.personInfo.id };
        // let file = { uri: faceInfo, type: 'multipart/form-data ', name: 'image.jpg' };
        // formData.append("faceInfo", file);
        // if (Global.personInfo.personType === personType.staff) {
        //     params = { ...params, from: "staff" };
        // } else {
        //     params = { ...params, from: "visitor" };
        // }
        // console.log(params);
        // for (var key in params) {
        //     formData.append(key, params[key]);
        // }

        // let opts = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json;charset=utf-8',
        //         'Content-Type': 'multipart/form-data;charset=utf-8',
        //     },
        //     body: formData,
        // };
        // console.log(url.faceVerify());
        // fetch(url.faceVerify(), opts).then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson);
        //         if (responseJson.status === 200) {
        //             if ("success".localeCompare(responseJson.result) === 0) {
        //                 this.props.navigation.state.params.toast(responseJson.msg);
        //                 this.props.navigation.goBack();
        //             } else {
        //                 this.props.navigation.state.params.toast("似乎出了什么错误");
        //                 this.props.navigation.goBack();
        //             }
        //         } else {
        //             this.props.navigation.state.params.toast("似乎出了什么错误");
        //             this.props.navigation.goBack();
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         this.props.navigation.state.params.toast("网络似乎在躲猫猫欸\n待会再试试吧");
        //         this.props.navigation.goBack();

        //     });
    }

    //拍摄照片
    takePicture = async () => {
        let options = {
            skipProcessing: true,//安卓端跳过拍照的过程，ios无效
            // doNotSave: true,
        };
        let data = await this.camera.takePictureAsync(options);
        this.faceVerify(data.uri);
    }


    // //开始录像
    // takeRecord = async (camera) => {
    //     this.setState({ isRecording: true });
    //     let options = {
    //         quality: RNCamera.Constants.VideoQuality["720p"],
    //         maxDuration: 3,
    //     };
    //     let data = await this.camera.recordAsync(options);
    //     // alert(data.uri);
    //     this.setState({ data: data });
    //     console.log(data);
    // };
    // //停止录像
    // stopRecord = (camera) => {
    //     this.camera.stopRecording();
    //     this.setState({ isRecording: false });
    // }
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.takePicture();
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        return (
            <View style={Styles.default}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Back onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{
                    flex: 8, alignItems: "stretch",
                    justifyContent: "flex-start", flexDirection: "column"
                }} >
                    <View style={{ flex: 1 }} />
                    <View style={{
                        flex: 2, borderWidth: 2, borderRadius: 1000,
                        borderColor: "white", overflow: "hidden"
                    }}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={{
                                flex: 1,
                            }}
                            defaultVideoQuality={RNCamera.Constants.VideoQuality["720p"]}
                            type={RNCamera.Constants.Type.front}
                            permissionDialogTitle={'Permission to use camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                    </View>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        );
    }

}


export default FaceVerifyScreen;