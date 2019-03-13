import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Styles from "../Style";
import Back from "../Component/Back";
import { RNCamera, FaceDetector } from "react-native-camera";
import Global, { personType } from "../Global";
import url from "../url";

//需要调用sdk通过照片传送
class FaceCognitionLoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: -1,
            data: null,
            isForgetPwd:false,
        };
    }

    componentWillMount() {
        let type = this.props.navigation.getParam("personType", -1);
        let isForgetPwd=this.props.navigation.getParam("isForgetPwd",false);
        this.setState({ type,isForgetPwd });
    }

    faceLogin = (faceInfo) => {
        let params = {};
        if (this.state.type == personType.staff) {
            let company = this.props.navigation.getParam("institution", "");
            let jobnum = this.props.navigation.getParam("jobnum", "");
            params = { faceInfo, company, jobnum };
        } else {
            let phone = this.props.navigation.getParam("phone", "");
            params = { faceInfo, phone };
        }
        let formData = new FormData();
        for (var key in params) {
            formData.append(key, params[key]);
        }
        let file = {
            uri: params.faceInfo,
            type: 'application/octet-stream',
            name: 'image.jpg'
        };
        formData.append("file", file);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
                //   "x-access-token": token,
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    if ("success".localeCompare(responseJson.rresult) === 0) {
                        Global.personInfo = { ...responseJson.data, personType: this.state.type };
                        Global.storage.save({
                            key: 'personInfo',  // 注意:请不要在key中使用_下划线符号!
                            data: Global.personInfo,
                            expires: 1000 * 3600 * 24 * 7
                        });
                        if(this.state.isForgetPwd){
                            this.props.navigation.navigate("App",{
                                isForgetPwd:true,
                            })
                        }else{
                            this.props.navigation.navigate("App");
                        }
                    } else {
                        this.props.navigation.state.params.return();
                        this.props.navigation.goBack();
                    }
                }
            })
            .catch(() => {
                this.props.navigation.navigate("NoInternet");
            });
    }

    //拍摄照片
    takePicture = async () => {
        let options = {
            skipProcessing: true,//安卓端跳过拍照的过程，ios无效
            doNotSave: true,
        };
        let data = await this.camera.takePictureAsync(options);
        this.faceLogin(data.uri);
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
        }, 1000);
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


export default FaceCognitionLoginScreen;