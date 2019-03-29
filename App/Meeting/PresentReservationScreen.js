import React, { Component } from "react";
import { Image, View, ScrollView, Text, Dimensions, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native";
import Reservation from "../../Component/Reservation";
import NoInternetScreen from "../NoInternetScreen";
import Loading from "../../Component/Loading";
import url from "../../url";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Global from "../../Global";

class PresentReservationScreen extends Component {
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
        this.timer=setTimeout(() => {
            this.setState({refreshState: RefreshState.Idle,data:Global.presentMeeting})
        }, 2000);
        
        // let personId=Global.personInfo.id;
        // this.setState({personId});
        // let URL = url.getRecentArrangeStaff(personId);
        // let opts = {
        //     method: "GET"
        // }
        // fetch(URL, opts).then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson);
        //         if (responseJson.status === 200) {
        //             this.setState({ data: responseJson.data });
        //         }
        //         
        //     }).catch(() => {
        //         this.setState({ isNet: false });
        //     })

    }

    getRecent = () => {
        this.setState({ isGetting: true, isNet: true });
        let personId=Global.personInfo.id;
        this.setState({personId});
        let URL = url.getRecentArrangeStaff(personId);
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

    componentWillMount() {
        // this.getRecent();
        let data =Global.presentMeeting;
        this.setState({data});
    }

    getPerson = (id, attendees) => {
        this.props.navigation.push("PersonList", {
            id: id,
            attendees: attendees,
        });
    }
    _keyExtractor = (item, index) => item.appointmentId.toLocaleString();

    _renderItem = ({ item }) => (
        <Reservation data={item} onPress={this.getPerson} />
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isNet ? this.state.isGetting ? <Loading /> : this.state.data.length > 0 ? <View style={{
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
                    <TouchableWithoutFeedback onPress={this.getRecent}>
                        <View style={{ flex: 1, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "#376B6D" }}>你最近没有会议哦</Text>
                            <Text style={{ fontSize: 20, color: "#376B6D" }}>给自己放个小假吧~(￣▽￣)~*</Text>
                            <Text style={{ fontSize: 20, color: "#376B6D" }}>轻触刷新页面</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    : <NoInternetScreen onPress={this.getRecent} />}
            </View>
        );
    }
}

export default PresentReservationScreen;