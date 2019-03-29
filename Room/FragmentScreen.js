import React, { Component } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList, NativeModules, Dimensions, Alert } from "react-native";
import Styles, { backgourndColor } from "../Style";
import Icon from "react-native-vector-icons/Ionicons"
import url from "../url";
import Toast from "react-native-easy-toast";
import FragmentItem from "../Room/FragmentItem";
import Modal from "react-native-modal";
import FragmentSelectItem from "../Room/FragmentSelectItem";
import QRCode from "react-native-qrcode-svg";
import DatePicker from "../Component/DatePicker";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fragment: [{ start: '08:00', end: '08:30', use: false, id: 0 },
            { start: '08:40', end: '09:10', use: true, id: 1 },
            { start: '09:20', end: '09:50', use: false, id: 2 },
            { start: '10:00', end: '10:30', use: false, id: 3 },
            { start: '10:40', end: '11:10', use: false, id: 4 },
            { start: '11:20', end: '11:50', use: false, id: 5 },
            { start: '12:00', end: '12:30', use: false, id: 6 },
            { start: '12:40', end: '13:10', use: false, id: 7 },
            { start: '13:20', end: '13:50', use: false, id: 8 },
            { start: '14:00', end: '14:30', use: false, id: 9 },
            { start: '14:40', end: '15:10', use: false, id: 10 },
            { start: '15:20', end: '15:50', use: false, id: 11 },
            { start: '16:00', end: '16:30', use: false, id: 12 },
            { start: '16:40', end: '17:10', use: false, id: 13 },
            { start: '17:20', end: '17:50', use: false, id: 14 },
            { start: '18:00', end: '18:30', use: true, id: 15 },
            { start: '18:40', end: '19:10', use: false, id: 16 },
            { start: '19:20', end: '19:50', use: false, id: 17 },
            { start: '20:00', end: '20:30', use: false, id: 18 },
            { start: '20:40', end: '21:10', use: false, id: 19 },
            { start: '21:20', end: '21:50', use: false, id: 20 },
            { start: '22:00', end: '22:30', use: false, id: 21 }],
            duration: 0,//会议室开启的时间长度
            piece: 0,//时间片
            rest: 0,//会议间隔时间
            isModalVisible: false,
            available: [],//预约会议可选取的时间片
            selectId: [],//预约会议选取的时间片id
            isVerify: false,//预约前的身份确认
        };
    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    componentDidMount() {
        // this.getArrangeList();
        // let date = new Date();
        // let start = "08:00:00";
        // let end = "21:32:00";
        // let startHour = parseInt(start.substring(0, 2));
        // let startMinute = parseInt(start.substring(3, 5));
        // let endHour = parseInt(end.substring(0, 2));
        // let endMinute = parseInt(end.substring(3, 5));
        // let duration = endHour * 60 + endMinute - startHour * 60 - startMinute;
        // let piece = 30;
        // let rest = 10;
        // let fragment = [];
        // start = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + start;
        // end = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + end;
        // let timestamp1 = new Date(start).getTime();

        // for (var i = 0; i < (duration / (piece + rest)) + 1; i++) {
        //     timestamp = timestamp1 + i * (piece + rest) * 60 * 1000;
        //     let startDate = new Date();
        //     let endDate = new Date();
        //     startDate.setTime(timestamp);
        //     let startHour = startDate.getHours();
        //     let startMinute = startDate.getMinutes();
        //     if (startHour / 10 < 1) {
        //         startHour = "0" + startHour;
        //     }
        //     if (startMinute / 10 < 1) {
        //         startMinute = "0" + startMinute;
        //     }
        //     let start = startHour + ":" + startMinute;
        //     endDate.setTime(timestamp + piece * 60 * 1000);

        //     let endHour = endDate.getHours();
        //     let endMinute = endDate.getMinutes();
        //     if (endHour / 10 < 1) {
        //         endHour = "0" + endHour;
        //     }
        //     if (endMinute / 10 < 1) {
        //         endMinute = "0" + endMinute;
        //     }
        //     let end = endHour + ":" + endMinute;
        //     fragment.push({
        //         start,
        //         end,
        //         use: false,
        //         id: i,
        //     })
        // }
        // this.setState({ duration, piece, rest, fragment });
        // console.log(fragment);

    }

    getArrangeList = () => {
        let d = new Date();
        let time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        console.log(time);
        let place_id = 20;
        let URL = url.searchArrange(time, place_id);
        let opt = {
            method: "GET",
        }
        fetch(URL, opt).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 200) {
                    if ("success".localeCompare(responseJson.result) === 0) {
                        this.setState({ data: responseJson.data })
                    } else {
                        this.refs.toast.show("似乎出了什么错");
                    }
                } else {
                    this.refs.toast.show("似乎出了什么错");
                }
            }).catch((error) => {
                console.log(error);
                this.refs.toast.show("似乎出了什么错");
            })
        // NativeModules.LoginInterface.jumpToSetting();
    }

    goBack = () => {

    }
    _keyExtractor = (item, index) => index.toLocaleString();

    _renderItem = ({ item }) => <FragmentItem data={item} onPress={this.handle} />

    //点击开启或预约
    handle = (id, use) => {
        let { fragment, rest } = this.state;
        if (use) {
            //跳转至人脸识别
            let date = new Date();
            let start, end;
            fragment.findIndex((item) => {
                if (item.id === id) {
                    start = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + item.start;
                    end = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + item.end;
                }
            });
            if (date.getTime() > new Date(start).getTime() - rest / 2 * 60 * 1000 && date.getTime() < new Date(end).getTime()) {
                this.refs.toast.show("asdf");
            } else if (date.getTime() < new Date(start).getTime() - rest / 2 * 60 * 1000) {
                this.refs.toast.show("还未到会议时间请稍后再来");
            } else {
                this.refs.toast.show("该会议已结束");
            }
        } else {
            let available = [];
            for (var i = id; i < fragment.length; i++) {
                if (!fragment[i].use) {
                    available.push(fragment[i]);
                    continue;
                }
                break;
            }
            this.setState({ available });
            console.log(this.state.available);
            this._toggleModal();
            this.timer = setTimeout(() => {
                this.setState({ isVerify: true });
            }, 3000);
        }
    }


    header = () => (
        <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <DatePicker onSelect={this.onSelectDate} />
            </View>
            <View style={{ backgroundColor: "#FAFAFA", flexDirection: "row", height: 40, borderBottomWidth: 1, borderBottomColor: backgourndColor }}>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: backgourndColor, fontWeight: "bold" }}>时间段</Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: backgourndColor, fontWeight: "bold" }}>预约状态</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontSize: 15, color: backgourndColor, fontWeight: "bold" }}>操作</Text>
                </View>
            </View>
        </View>
    )

    separator = () => <View style={{ borderTopWidth: 1, borderColor: backgourndColor }} />

    _renderSelectItem = (item) => <FragmentSelectItem data={item} onPress={this.select} />

    //选择预约时间段
    select = (id, isSelect) => {
        let { selectId } = this.state;
        if (isSelect) {
            selectId.push(id);
        } else {
            selectId.splice(selectId.findIndex(item => item === id), 1);
        }
        console.log(selectId);
        this.setState({ selectId });
    }

    //选择时间段完成
    selectComplete = () => {
        let { selectId, fragment } = this.state;
        if (selectId.length === 0) {
            this._toggleModal();
            return;
        }
        for (var i = 0; i < fragment.length; i++) {
            if (fragment[i].id === selectId[0]) {
                let date = new Date();
                let start = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + fragment[i].start;
                console.log(start);
                if (new Date(start).getTime() < date.getTime()) {
                    this._toggleModal();
                    this.refs.toast.show("预约的时间不能早于当前时间");
                    return;
                }
            }
        }
        let bitmap = [];
        for (var i = 0; i < selectId.length; i++) {
            bitmap.push(0);
        }
        selectId.map((item) => {
            bitmap[item % selectId.length] += 1;
        })
        console.log(bitmap);
        for (var i = 0; i < bitmap.length; i++) {
            if (bitmap[i] != 1) {
                Alert.alert("时间段必须得是连续的哦", "请重新选择", [
                    {
                        text: "是"
                    }
                ])
                return;
            }
        }
        fragment.map((item) => {
            selectId.map((i) => {
                if (i === item.id) {
                    item.use = true;
                }
            })
        })
        this.setState({ fragment, selectId: [] });
        this._toggleModal();
        this.refs.toast.show("预约成功");
        // this.setState({selectId:[]});

    }
    render() {
        let { width } = Dimensions.get("window");
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1, }}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Icon name="ios-settings" size={30} color={"white"} style={{ margin: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 9, alignItems: "stretch", justifyContent: "flex-start", padding: 20 }} >
                    <View style={{ borderRadius: 30, flex: 1, borderWidth: 1, borderColor: "#FAFAFA", padding: 20, backgroundColor: "#FAFAFA" }}>
                        {this.header()}
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={this.state.fragment}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            ItemSeparatorComponent={this.separator}
                        />

                    </View>
                </View >
                <View style={{ flex: 1 }} />
                <Toast
                    ref="toast"
                    style={Styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: backgourndColor, fontSize: 20, fontWeight: "bold" }}
                />
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => { this._toggleModal() }}
                >
                    <View style={{ flex: 1, flexDirection: "row",backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 8, padding: 20 }}>
                            <View style={{
                                flex: 1, borderRadius: 30, borderWidth: 1, alignItems: "stretch",
                                borderColor: "#FAFAFA", padding: 20, backgroundColor: "#FAFAFA",
                            }}>
                                {this.state.isVerify ?
                                    <View style={{ flex: 1, alignItems: "stretch" }}>
                                        <View style={{ borderBottomColor: backgourndColor, borderBottomWidth: 1, alignItems: "center" }}>
                                            <Text style={{ fontSize: 18, fontWeight: "bold", color: backgourndColor }}>从该时间段起您可选择以下时间</Text>
                                        </View>

                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            data={this.state.available}
                                            extraData={this.state}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderSelectItem}
                                            ItemSeparatorComponent={this.separator}
                                        />
                                        <TouchableOpacity onPress={this.selectComplete}>
                                            <View style={{
                                                borderRadius: 20, borderWidth: 1, borderColor: "#FAFAFA", justifyContent: "center",
                                                backgroundColor: backgourndColor, alignItems: "center", height: 50,
                                            }}>
                                                <Text style={{ fontSize: 20, color: "white" }}>完成</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View> :
                                    <View style={{ flex: 1 }}>

                                        <QRCode value={"https:jsjzx.top/smr-0.0.1/verifyStaff"} size={width * 0.6} />
                                        <View style={{ borderBottomColor: backgourndColor, borderBottomWidth: 1, alignItems: "center", margin: 40 }}>
                                            <Text style={{ fontSize: 18, fontWeight: "bold", color: backgourndColor }}>请扫码登录</Text>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={{ flex: 1 }} />

                    </View>
                </Modal>
            </View >
        )
    }
}
