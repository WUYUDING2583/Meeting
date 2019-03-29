import React, { Component } from "react";
import { Image, View, ScrollView, Text, Dimensions, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native";
import Reservation from "../../Component/Reservation";
import NoInternetScreen from "../NoInternetScreen";
import Loading from "../../Component/Loading";
import url from "../../url";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Global from "../../Global";

class HistoryReservationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //id:this.props.navigation.getParam("id",-1),
            data: [],
            isNet: true,
            isGetting: false,
            personId: -1,
            refreshState: RefreshState.Idle,
        }
    }
    onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing, isNet: true });
        this.timer = setTimeout(() => {
            this.setState({ data: Global.historyMeeting, refreshState: RefreshState.Idle });
        }, 1000);
        // let personId = Global.personInfo.id;
        // this.setState({ personId });
        // let URL = url.getHistoryArrangeStaff(personId);
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

    getHistory = () => {
        this.setState({ isGetting: true, isNet: true });
        let personId = Global.personInfo.id;
        this.setState({ personId });
        let URL = url.getHistoryArrangeStaff(personId);
        let opts = {
            method: "GET"
        }
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 200) {
                    if (responseJson.data === null) {
                        this.setState({ data: [] });
                    } else {
                        this.setState({ data: responseJson.data });
                    }
                } else {
                    this.setState({ data: [] });
                }
                this.setState({ isGetting: false });
            }).catch(() => {
                this.setState({ isNet: false });
            })
    }

    componentWillMount() {
        // this.getHistory();
        let data = Global.historyMeeting;
        this.setState({ data });
    }

    getPerson = (id, attendees) => {
        this.props.navigation.push("PersonList", {
            id: id,
            attendees: attendees,
            isHistory: true,
        });
    }
    _keyExtractor = (item, index) => item.appointmentId.toLocaleString();

    _renderItem = ({ item }) => (
        <Reservation data={item} onPress={this.getPerson} />
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isNet ? this.state.isGetting ? <Loading /> : this.state.data === null || this.state.data.length > 0 ? <View style={{
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
                    <TouchableWithoutFeedback onPress={this.getHistory}>
                        <View style={{ flex: 1, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#376B6D" }}>(～￣▽￣)～</Text>
                            <Text style={{ fontSize: 20, color: "#376B6D" }}>你还没有参加过会议哦</Text>
                            <Text style={{ fontSize: 20, color: "#376B6D" }}>轻触刷新页面</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    : <NoInternetScreen onPress={this.getHistory} />}
            </View>
        );
    }
}

export default HistoryReservationScreen;