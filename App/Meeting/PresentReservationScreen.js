import React, { Component } from "react";
import { Image, View, ScrollView, Text, Dimensions, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native";
import Reservation from "../../Component/Reservation";
import NoInternetScreen from "../NoInternetScreen";
import Loading from "../../Component/Loading";
import url from "../../url";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";

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
        storage.load({
            key: 'staffInfo',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            this.setState({ personId: ret.personId });
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
        let URL = url.getRecentArrangeStaff(this.state.personId);
        let opts = {
            method: "GET"
        }
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    this.setState({ data: responseJson.data });
                }
                this.setState({refreshState: RefreshState.Idle})
            }).catch(() => {
                this.setState({ isNet: false });
            })
    }

    getRecent = () => {
        this.setState({ isGetting: true, isNet: true });
        storage.load({
            key: 'staffInfo',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            this.setState({ personId: ret.personId });
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
        let URL = url.getRecentArrangeStaff(this.state.personId);
        let opts = {
            method: "GET"
        }
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
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
        //     职员:
        // url:http://localhost:8080/conference/staff/getHistory
        // 游客：
        // url:http://localhost:8080/conference/visitor/getHistory

        // 请求方式：get
        // 请求参数：BigInteger personId(用户的唯一编号)

        let data = [
            {
                appointmentId: 2,
                place: "广B203",
                address: "广知楼",
                date: "2011-04-10",
                time: "01:05~01:35",
                //end_time: "2011-04-10T01:35:08.000+0000",
                introduction: "asdfaertad",
                organizer: "Lizzette466",
                phone: "(402) 687-8343",
                attendees: [
                    {
                        id: 3,
                        appointmentId: 2,
                        personId: 1,
                        name: "张鑫楠",
                        identity: "staff",
                        state: "已出席",
                    }
                ]
            }, {
                appointmentId: 2,
                place: "广B203",
                address: "广知楼",
                date: "2011-04-10",
                time: "01:05~01:35",
                //end_time: "2011-04-10T01:35:08.000+0000",
                introduction: "asdfaertad",
                organizer: "Lizzette466",
                phone: "(402) 687-8343",
                attendees: [
                    {
                        id: 3,
                        appointmentId: 2,
                        personId: 1,
                        name: "张鑫楠",
                        identity: "staff",
                        state: "已出席",
                    }
                ]
            }, {
                appointmentId: 2,
                place: "广B203",
                address: "广知楼",
                date: "2011-04-10",
                time: "01:05~01:35",
                //end_time: "2011-04-10T01:35:08.000+0000",
                introduction: "asdfaertad",
                organizer: "Lizzette466",
                phone: "(402) 687-8343",
                attendees: [
                    {
                        id: 3,
                        appointmentId: 2,
                        personId: 1,
                        name: "张鑫楠",
                        identity: "staff",
                        state: "已出席",
                    }
                ]
            }, {
                appointmentId: 2,
                place: "广B203",
                address: "广知楼",
                date: "2011-04-10",
                time: "01:05~01:35",
                //end_time: "2011-04-10T01:35:08.000+0000",
                introduction: "asdfaertad",
                organizer: "Lizzette466",
                phone: "(402) 687-8343",
                attendees: [
                    {
                        id: 3,
                        appointmentId: 2,
                        personId: 1,
                        name: "张鑫楠",
                        identity: "高级程序",
                        state: "已出席",
                    },
                ]
            },
        ]
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
                        {/* <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        /> */}
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