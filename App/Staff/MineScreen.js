import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, Dimensions, CameraRoll, Modal, TouchableOpacity } from "react-native";
import Seperate from "../../Component/Seperate";
import Icon from "react-native-vector-icons/Ionicons";

class MineScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "stretch", backgroundColor: "#FAFAFA" }}>
                <ScrollView style={{ flex: 1 }}>
                    <TouchableWithoutFeedback>
                        <View style={{ margin: 10, marginBottom: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold", color: "#696969" }}>吴宇丁</Text>
                                <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15, color: "#376B6D" }}>查看并编辑个人资料</Text>
                            </View>
                            <Image source={require("../../Component/weather.jpg")}
                                style={{ width: 70, height: 70, borderRadius: 70, margin: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>人脸认证</Text>
                            <Icon name="ios-journal" size={30} color={"#376B6D"} style={{ marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>预约记录</Text>
                            <Icon name="ios-bookmarks" size={30} color={"#376B6D"} style={{ marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>成为发布者</Text>
                            <Icon name="ios-business" size={30} color={"#376B6D"} style={{ marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>向我们反馈</Text>
                            <Icon name="ios-send" size={30} color={"#376B6D"} style={{ marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>退出登录</Text>
                            <Icon name="md-planet" size={30} color={"#376B6D"} style={{ marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                </ScrollView>
            </View>
        )
    }
}

export default MineScreen;