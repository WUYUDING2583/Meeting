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
import Modal from "react-native-modal";
import Spinner from "react-native-spinkit";

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
            isModalVisible: false,
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
        let month=new Date().getMonth() + 1;
        let day=new Date().getDate();
        if(month/10<1){
            month="0"+month;
        }
        if(day/10<1){
            day="0"+day;
        } 
        let date=new Date().getFullYear() + "-" + month + "-" + day;//预约日期
        this.setState({date});
        if (!Global.personInfo.identified) {
            Alert.alert("你还没有完成人脸认证", "是否现在就进行", [
                {
                    text: '我不要',
                },
                {
                    text: '马上就去',
                    onPress: () => {
                        this.props.navigation.navigate("FaceVerify", {
                            toast: this.toast,
                        });
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
        Geolocation.start();
    }


    toast = (info) => {
        this.refs.toast.show(info);
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
        console.log(date);
        if (date.getTime() < new Date().getTime()) {
            this.toast("不能选择今天之前的日期哦");
            date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
            console.log(date);
        } else {
            let month=date.getMonth() + 1;
            let day=date.getDate();
            if(month/10<1){
                month="0"+month;
            }
            if(day/10<1){
                day="0"+day;
            }
            date = date.getFullYear() + "-" + month + "-" + day;
            console.log(date);
        }
        this.setState({ date });
    }

    onSelectStartTime = (hour, minute) => {
        this.setState({ startHour: hour, startMinute: minute })
        let { endHour, endMinute } = this.state;
        if (endHour != 0) {
            let duration = endHour * 60 + endMinute - hour * 60 - minute;
            this.setState({ duration });
        }
        if (minute / 10 < 1) {
            minute = "0" + minute;
        }
        if (hour / 10 < 1) {
            hour = "0" + hour;
        }
        let time = hour + ":" + minute + ":00";
        this.setState({ starttime: time });

    }

    onSelectEndTime = (hour, minute) => {
        this.setState({ endHour: hour, endMinute: minute });
        let { startHour, startMinute } = this.state;
        if (startHour != 0) {
            let duration = hour * 60 + minute - startHour * 60 - startMinute;
            this.setState({ duration });
        }
        if (minute / 10 < 1) {
            minute = "0" + minute;
        }
        if (hour / 10 < 1) {
            hour = "0" + hour;
        }
        let time = hour + ":" + minute + ":00";
        this.setState({ endtime: time });

    }


    makeReser = () => {
        // this.setState({ isGetting: true });
        this._toggleModal();
        let { starttime, endtime, date, duration, capacity, latitude, longitude } = this.state;
        starttime = date + " " + starttime;
        endtime = date + " " + endtime;
        latitude = latitude + "";
        longitude = longitude + "";
        
        capacity = parseInt(capacity)
        let data = { companyId: Global.personInfo.companyId, starttime, endtime, duration, capacity, longitude, latitude };
        console.log(JSON.stringify(data));
        let formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        Geolocation.stop();
        let opts = {
            method: 'POST',
            headers: {
                Accept: 'application/json;charset=utf-8',
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData,
        };
        console.log(url.getPlaceListStaff());
        fetch(url.getPlaceListStaff(), opts).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this._toggleModal();
                if (responseJson.status === 200) {
                    let best = responseJson.data[0].recommends;
                    let standby = responseJson.data[1].recommends;
                    let outside = responseJson.data[2].recommends;
                    let dat = { starttime, endtime, duration, capacity };
                    this.props.navigation.push("RoomList", {
                        best: best,
                        standby: standby,
                        outside: outside,
                        data: dat,
                    })
                } else {
                    this.refs.toast.show(responseJson.msg);
                }
            }).catch((error) => {
                this.refs.toast.show("哦哦网络在躲猫猫欸")
                console.log(error);
            })
    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    nextPage = () => {
        // this.makeReser();
        // this._toggleModal();
        
        Geolocation.stop()
        let { starttime, endtime, date, duration, capacity } = this.state;
        let r = /^\+?[1-9][0-9]*$/;　　//正整数
        if(!r.test(capacity)){
            this.toast("与会人数必须是正整数哦");
            return;
        }
        if(starttime.length===0||endtime.length===0){
            this.toast("时间是必须的");
            return;
        }
        
        let best = Global.best;
        let standby = [];
        let outside = [];
        starttime = date + " " + starttime;
        endtime = date + " " + endtime;
        let reg=new RegExp("-","gm");
        let start=starttime.replace(reg,"/");
        let end=endtime.replace(reg,"/");
        if(new Date().getTime()>new Date(start).getTime()-30*60*1000){
            this.toast("预约时间不能为当前时间的30分钟前");
            return;
        }
        if(new Date(start).getTime()>=new Date(end).getTime()){
            this.toast("会议结束时间不能早于会议开始时间");
            return;
        }
        console.log(starttime);
        let dat = { starttime, endtime, duration, capacity };
        console.log(dat);
        this._toggleModal();
        this.timer=setTimeout(() => {
            this._toggleModal();
            this.props.navigation.push("RoomList", {
                best: best,
                standby: standby,
                outside: outside,
                data: dat,
            });
        }, 500);
        
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={Styles.appDefault}>
                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }} />
                    <View style={{ flex: 8, alignItems: "stretch", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, margin: 10, fontWeight: "bold", color: "#376B6D" }}>会议日期</Text>
                        <DatePicker onSelect={this.onSelectDate} date={this.state.date} />
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
                </View >
                <Toast
                    ref="toast"
                    style={styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                />
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <Spinner style={styles.spinner}
                            size={Global.gScreen.screen_width*0.4} type={"9CubeGrid"}
                            color={"#376B6D"} />
                    </View>
                </Modal>
            </View>
        )
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    spinner: {
        position: "absolute",
        top: Global.gScreen.screen_height * 0.3,
        left: Global.gScreen.screen_width * 0.25,
    },
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