import React, { Component } from "react";
import { Image, View, ScrollView, Text, Dimensions, StyleSheet, TouchableWithoutFeedback, FlatList, Alert } from "react-native";
import Reservation from "../Component/Reservation";
import NoInternetScreen from "./NoInternetScreen";
import Loading from "../Component/Loading";
import url from "../url";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Global from "../Global";
import Back from "../Component/Back";
import Toast from "react-native-easy-toast";
import { backgourndColor } from "../Style";

class MyAppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isNet: true,
            isGetting: false,
            personId: -1,
            refreshState: RefreshState.Idle,
        }
    }

    onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing, isNet: true });
        this.timer=setTimeout(() => {
            this.setState({ refreshState: RefreshState.Idle });
        }, 1000);
        // let personId = Global.personInfo.id;
        // this.setState({ personId });
        // let URL = url.getAppointmentStaff(personId);
        // let opts = {
        //     method: "GET"
        // }
        // fetch(URL, opts).then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson);
        //         if (responseJson.status === 200) {
        //             this.setState({ data: responseJson.data });
        //         }
        //         this.setState({ refreshState: RefreshState.Idle })
        //     }).catch(() => {
        //         this.setState({ isNet: false });
        //     })
    }

    getAppointment = () => {
        this.setState({ isGetting: true, isNet: true });
        let personId = Global.personInfo.id;
        this.setState({ personId });
        let URL = url.getAppointmentStaff(personId);
        let opts = {
            method: "GET"
        }
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 200) {
                    this.setState({ data: responseJson.data });
                }
                this.setState({ isGetting: false });
            }).catch(() => {
                this.setState({ isNet: false });
            })
    }

    componentDidMount() {
        // this.getAppointment();
        let data =Global.myAppoint;
        this.setState({ data });
    }

    getPerson = (id, attendees) => {
        this.props.navigation.push("PersonList", {
            id: id,
            attendees: attendees,
        });
    }
    _keyExtractor = (item, index) => item.appointmentId.toLocaleString();

    _renderItem = ({ item }) => (
        <Reservation data={item} onPress={this.getPerson} cancle={this.cancle} />
    );

    cancle = (appointmentId) => {
        // /alert(appointmentId);
        Alert.alert("确定取消会议吗", "", [
            {
                text: '确定',
                onPress: () => {
                    this.setState({ isGetting: true });
                    Global.myAppoint.splice(Global.myAppoint.findIndex(item => item.appointmentId === appointmentId), 1);
                    Global.presentMeeting.splice(Global.presentMeeting.findIndex(item => item.appointmentId === appointmentId), 1)
                    this.timer = setTimeout(() => {
                        this.setState({data:Global.myAppoint,isGetting: false });
                    }, 2000);
                }
            },
            {
                text: '不',
            },
        ])

        // let URL=url.cancelAppointment(appointmentId);
        // let opt={
        //     method:"GET"
        // }
        // fetch(URL,opt).then((response)=>response.json())
        // .then((responseJson)=>{
        //     console.log(responseJson);
        //     if(responseJson.status===200){
        //         if("success".localeCompare(responseJson.result)===0){
        //             this.getAppointment();
        //         }else{
        //             this.refs.toast.show(responseJson.msg);
        //         }
        //     }else{
        //         this.refs.toast.show("有什么东西出错了,取消失败");
        //     }
        // }).catch((error)=>{
        //     console.log(error);
        //     this.refs.toast.show("有什么东西出错了,取消失败");
        // })
    }

    render() {
        return (
            <View style={{ flex: 1,  backgroundColor: "#FAFAFA" }}>
                <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <Back onPress={() => this.props.navigation.goBack()} color={backgourndColor} />
                </View>
                <View style={{ flex: 10 }}>
                    {this.state.isNet ? this.state.isGetting ? <Loading /> : this.state.data != null ? <View style={{
                        flex: 1, alignItems: "stretch", justifyContent: "center",
                        marginLeft: 10, marginRight: 10, backgroundColor: "#FAFAFA", flexDirection: "row"
                    }}>
                        <View style={{ flex: 1, borderRightWidth: 4, borderRightColor: "#376B6D" }} />
                        <View style={{ flex: 25 }}>
                            <RefreshListView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                data={this.state.data}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                                refreshState={this.state.refreshState}
                                onHeaderRefresh={this.onHeaderRefresh}
                            />
                        </View>
                    </View> :
                        <TouchableWithoutFeedback onPress={this.getAppointment}>
                            <View style={{ flex: 1, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 20, color: "#376B6D" }}>你还没有预约过会议哦</Text>
                                <Text style={{ fontSize: 20, color: "#376B6D" }}>快去发起一个会议吧~(￣▽￣)~*</Text>
                                <Text style={{ fontSize: 20, color: "#376B6D" }}>轻触刷新页面</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        : <NoInternetScreen onPress={this.getRecent} />}
                </View>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                />
            </View>
        );
    }
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
export default MyAppointmentScreen;