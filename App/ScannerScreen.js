import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Easing,
    Platform,
    Text,
    Dimensions,
    InteractionManager,
    TouchableWithoutFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';
import { RNCamera } from 'react-native-camera'
import Back from '../Component/Back';
const { width, height } = Dimensions.get('window')
import url, { QRCType } from "../url";
import NoInternetScreen from "./NoInternetScreen";
import Global, { personType } from "../Global";

export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transCode: '', // 条码
            type: '', // 条码类型
            show: true,
            animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
            avatarSource: null,
            personId: "",
            personName: "",
            isNet: true,//是否链接网络
        }
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.startAnimation()
        })
    }
    // 动画开始
    startAnimation() {
        if (this.state.show) {
            this.state.animate.setValue(0);
            Animated.timing(this.state.animate, {
                toValue: 1,   // 运动终止位置，比值
                duration: 2500,  // 动画时长
                easing: Easing.linear,  // 线性的渐变函数
                delay: 0.5,// 在一段时间之后开始动画（单位是毫秒），默认为0
            }).start(() => this.startAnimation())
        }
    }
    componentWillUnmount() {
        this.setState({ show: false });
    }

    start = () => {
        this.setState({ show: true });
        InteractionManager.runAfterInteractions(() => {
            this.startAnimation()
        })
    }

    //添加与会人员
    addAttendPerson = (meetingId, data = "") => {
        if (meetingId === -1) {
            this.props.navigation.navigate("Message", {
                start: this.start,
            });
        } else {
            if (data === QRCType.meeting) {
                this.props.navigation.navigate("Message", {
                    message: "加入会议成功",
                    start: this.start,
                });
            }else{
                this.props.navigation.navigate("Message", {
                    message: "加入群组成功",
                    start: this.start,
                });
            }
        }
        // let personId = Global.personInfo.id;
        // let name = Global.personInfo.name;
        // let identity=Global.personInfo.personType===personType.staff?"staff":"visitor";
        // let attendees = [];
        // attendees.push({ personId, name,state:"未出席",identity });
        // let data = { meetingId, attendees };
        // console.log(data);
        // let opts = {
        //     method: "POST",   //请求方法
        //     body: JSON.stringify(data),   //请求体
        //     headers: {
        //         'Accept': 'application/json;charset=utf-8',
        //         'Content-Type': 'application/json;charset=utf-8',
        //         "Connection": "close",
        //     },
        // };
        // console.log(url.addAttendee());
        // fetch(url.addAttendee(), opts).then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson);
        //         if (responseJson.status === 200) {
        //             if ("success".localeCompare(responseJson.result) === 0) {
        //                 this.props.navigation.navigate("Message", {
        //                     message: "加入会议成功",
        //                     start: this.start,
        //                 });
        //             } else {
        //                 this.props.navigation.navigate("Message", {
        //                     message: "出现了某些问题，没有加入会议",
        //                     start: this.start,
        //                 });
        //             }
        //         } else {
        //             this.props.navigation.navigate("Message", {
        //                 message: "出现了某些问题，没有加入会议",
        //                 start: this.start,
        //             });
        //         }
        //     }).catch((error) => {
        //         console.log(error);
        //         this.props.navigation.navigate("Message", {
        //             message: "网络似乎出现了问题",
        //             start: this.start,
        //         });
        //     })
    }
    barcodeReceived = (e) => {
        if (this.state.show) {
            console.log(e);
            let data = {};
            this.timer=setTimeout(() => {
                try {
                    data = JSON.parse(e.data);
                } catch (error) {
                    this.addAttendPerson(-1);
                }
    
                console.log(data);
                this.addAttendPerson(data.code, data.type);
                this.setState({
                    transCode: e.data,
                    type: e.type,
                    show: false
                })
            }, 1000);
            
        }
    }
    //选择图片
    selectPhotoTapped = () => {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {

            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            // this.setState({
            //     avatarSource: source
            // });

        });
    }
    // recoginze = async (source)=>{
    //     // Here is the demoe
    //      let result = await LocalBarcodeRecognizer.decode(imageBase64.replace("data:image/jpeg;base64,",""),{codeTypes:['ean13','qr']});
    //      alert(result);
    //   }
    render() {
        let avatarSource = this.state.avatarSource;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
                        <Back onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ position: "absolute", top: 20, right: 10, zIndex: 10 }}>
                        <TouchableWithoutFeedback onPress={this.selectPhotoTapped}>
                            <Text style={{ fontSize: 20, color: "white" }}>相册</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <RNCamera
                        onBarCodeRead={this.barcodeReceived}
                        onCameraReady={() => {
                            console.log('ready')
                        }}
                        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                        googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        style={styles.camera}
                    >
                        <View style={styles.box}>
                            <View style={styles.kuang}>
                                <Animated.View style={{
                                    alignItems: 'center',
                                    transform: [{
                                        // translateX: x轴移动
                                        // translateY: y轴移动
                                        translateY: this.state.animate.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 200]
                                        })
                                    }]
                                }}>
                                    <Text style={{ width: 250, height: 1, backgroundColor: '#00ff00' }}></Text>
                                </Animated.View>
                            </View>
                        </View>
                    </RNCamera>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    kuang: {
        width: 260,
        height: 260,
        borderWidth: 1,
        borderColor: 'skyblue',
        backgroundColor: '#rgba(255,255,255,0.1)'
    },
    info: {
        width: width,
        height: 80,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingBottom: 5,
        justifyContent: 'space-around',
    }
});