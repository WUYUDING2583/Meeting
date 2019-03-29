import React, { Component } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList, NativeModules, } from "react-native";
import Styles, { backgourndColor } from "../Style";
import Icon from "react-native-vector-icons/Ionicons"
import url from "../url";
import Toast from "react-native-easy-toast";
import RoomItem from "../Room/RoomItem";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: -1,
        };
    }
    componentDidMount() {
        this.getRoomList();
    }

    getRoomList = () => {
        let URL = url.getMeetingRoomList(1);
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
                        this.refs.toast.show(responseJson.msg);
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
    _keyExtractor = (item, index) => item.id.toLocaleString();

    _renderItem = ({ item }) => {
        if (item.id === this.state.id) {
            return <RoomItem data={item} onPress={this.select} select={true} />
        }else{
            return <RoomItem data={item} onPress={this.select} select={false} />
        }
        
    };

    select = (id) => {
        if (id === this.state.id) {
            id = -1;
        }
        this.setState({ id });
    }

    verify=()=>{
        let {id}=this.state;
        if(id===-1){
            this.refs.toast.show("请选择一个会议室");
            return;
        }
        //存储
    }
    render() {
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1,}}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Icon name="ios-arrow-round-back" size={40} color={"white"} style={{ margin: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }} >
                    <View style={{ margin: 30,flexDirection:"row",justifyContent:"space-between"  }}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>选择此设备所代表的会议室</Text>
                        <TouchableOpacity onPress={this.verify}>
                            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>确定</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
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
            </View >
        )
    }
}
