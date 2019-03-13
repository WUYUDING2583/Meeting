import React, { Component } from 'react';
import { Text, View, TextInput, Alert, StyleSheet } from 'react-native';
import Styles from '../../../Style';
import DatePicker from "../../../Component/DatePicker";
import TimePicker from "../../../Component/TimePicker";
import Button from "../../../Component/Button";
import Scanner from "../../../Component/Scanner";
import url from "../../../url";
import Loading from "../../../Component/Loading";
import ButtonLoading from '../../../Component/ButtonLoading';
import NoInternetScreen from '../../NoInternetScreen';
import Toast from "react-native-easy-toast";
import Global from "../../../Global";
import { Geolocation } from "react-native-amap-geolocation";

class InputInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starttime: '',//会议开始时间
            startHour: 0,
            startMinute: 0,
            endtime: '',//会议结束时间
            endHour: 0,
            endMinute: 0,
            duration: 0,//会议时长
            capacity: 0,//会议人数
            companyNo: "",//公司编号
            date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),//预约日期
            // height: 0,//屏幕高度
            // width: 0,//屏幕宽
            isResult: false,
            isNet: true,
            isGetting: false,
            latitude: null,
            longitude: null,
        };
    }
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: '会议场地搜索',
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'normal',
            },
            headerRight: (
                <Scanner onPress={() => navigation.navigate("Scanner")} />
            ),
        };
    };


    componentWillMount() {
        Geolocation.init({
            android: "49af4bf771f819910e67eb9f62a2e090"
        });
    }

    componentDidMount() {
        if (!Global.personInfo.isIdentified) {
            Alert.alert("你还没有完成人脸认证", "是否现在就进行", [
                {
                    text: '我不要',
                },
                {
                    text: '马上就去',
                    onPress: () => {
                        this.props.navigation.push("FaceCognition")
                    }
                },
            ])
        }
        Geolocation.setOptions({
            interval: 5000,
            distanceFilter: 10,
            reGeocode: true
        });
        Geolocation.addLocationListener(location => {
            this.updateLocationState(location);
            console.log(location);
        });
    }

    componentWillUnmount() {
        Geolocation.stop()
    }

    updateLocationState(location) {
        if (location) {
            location.timestamp = new Date(location.timestamp).toLocaleString();
            let { latitude, longitude } = location;
            this.setState({ latitude, longitude });
            console.log(location)
        }
    }

    onSelectDate = (year, month, day) => {
        let date = new Date(year, month, day);
        date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this.setState({ date });
    }

    onSelectStartTime = (hour, minute) => {
        let time = hour + ":" + minute;
        this.setState({ starttime: time, startHour: hour, startMinute: minute });
        let { endHour, endMinute } = this.state;
        if (endHour != 0) {
            let duration = endHour * 60 + endMinute - hour * 60 - minute;
            this.setState({ duration });
        }
    }

    onSelectEndTime = (hour, minute) => {
        let time = hour + ":" + minute;
        this.setState({ endtime: time, endHour: hour, endMinute: minute });
        let { startHour, startMinute } = this.state;
        if (startHour != 0) {
            let duration = hour * 60 + minute - startHour * 60 - startMinute;
            this.setState({ duration });
        }
    }


    makeReser = () => {
        this.setState({ isGetting: true });
        let { starttime, endtime, date, duration, capacity, latitude, longitude } = this.state;
        let data = { starttime, endtime, date, duration, capacity, latitude, longitude };
        let opts = {
            method: "POST",   //请求方法
            body: data,   //请求体
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        fetch(url.getPlaceListStaff(), opts).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    this.setState({ isGetting: false });
                    let best = responseJson.data[0].recommends;
                    let standby = responseJson.data[1].recommends;
                    let outside=responseJson.data[3].recommends;
                    starttime = date + " " + starttime;
                    endtime = date + " " + endtime;
                    let dat = { starttime, endtime, duration, capacity };
                    this.props.navigation.push("RoomList", {
                        best: best,
                        standby: standby,
                        outside:outside,
                        data: dat,
                    })
                }
            }).catch((error) => this.refs.toast.show("哦哦网络在躲猫猫欸"))
    }

    nextPage = () => {
        // this.makeReser();
        this.setState({ isGetting: true });
        let { starttime, endtime, date, duration, capacity } = this.state;
        let best = [
            {
                id: 1,
                name: '学堂',
                address: '书院后山啊手动阀手动阀撒旦发射点发撒地方撒旦',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "A",
            },
            {
                id: 2,
                name: '教堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
            {
                id: 3,
                name: '去堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
            {
                id: 4,
                name: '他堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
        ];
        let standby = [
            {
                id: 1,
                name: '学堂',
                address: '书院后山啊手动阀手动阀撒旦发射点发撒地方撒旦',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "A",
            },
            {
                id: 2,
                name: '教堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
            {
                id: 3,
                name: '去堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
            {
                id: 4,
                name: '他堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
        ];
        let outside = [
            {
                id: 1,
                name: '学堂',
                address: '书院后山啊手动阀手动阀撒旦发射点发撒地方撒旦',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "A",
            },
            {
                id: 2,
                name: '教堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
            {
                id: 3,
                name: '去堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
            {
                id: 4,
                name: '他堂',
                address: '书院后山',
                introduction: '不能毁坏书桌',
                device: "书桌",
                instruction: null,
                capacity: 20,
                type: "B"
            },
        ];
        starttime = date + " " + starttime;
        endtime = date + " " + endtime;
        let dat = { starttime, endtime, duration, capacity };
        this.setState({ isGetting: false });
        this.props.navigation.push("RoomList", {
            best: best,
            standby: standby,
            outside:outside,
            data: dat,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.isGetting ? <Loading />
                    : <View style={Styles.appDefault}>
                        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }} />
                        <View style={{ flex: 8, alignItems: "stretch", justifyContent: "center" }}>
                            <Text style={{ fontSize: 20, margin: 10, fontWeight: "bold", color: "#376B6D" }}>会议日期</Text>
                            <DatePicker onSelect={this.onSelectDate} />
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, alignItems: "stretch" }}>
                                    <TimePicker text="开始时间" onSelect={this.onSelectStartTime} />
                                </View>
                                <View style={{ flex: 1, alignItems: "stretch" }}>
                                    <TimePicker text="结束时间" onSelect={this.onSelectEndTime} />
                                </View>
                            </View>
                            <TextInput style={styles.input} placeholder="与会人数" placeholderTextColor="#a5a5a5"
                                onChangeText={(capacity) => this.setState({ capacity })} keyboardType="number-pad" />
                            {this.state.isResult ?
                                <ButtonLoading background={{ ...Styles.appButtonContainer }}
                                    style={{ ...Styles.appButtonText }}
                                />
                                : <Button title="预约" onPress={this.nextPage}
                                    textStyle={{ ...Styles.appButtonText }}
                                    background={{ ...Styles.appButtonContainer }} />}
                        </View >
                        <View style={{ flex: 1 }} />
                    </View >}
                <Toast
                    ref="toast"
                    style={styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                />
            </View>
        )
    };
}
const styles = StyleSheet.create({
    input: {
        margin: 5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#cdcdcd',
        fontSize: 20,
    },
    toast: {
        width: Global.gScreen.screen_width * 0.5,
        height: Global.gScreen.screen_width * 0.5,
        backgroundColor: "#376B6D",
        borderWidth: 1,
        borderColor: "#376B6D",
        borderRadius: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default InputInfoScreen;