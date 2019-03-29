import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, StyleSheet, Dimensions, CameraRoll, Modal, TouchableOpacity, Alert } from "react-native";
import Seperate from "../../Component/Seperate";
import Icon from "react-native-vector-icons/Ionicons";
import Global from "../../Global";
import Toast from "react-native-easy-toast";

class MineScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:Global.personInfo.name,

        }
    }
    toast = (info) => {
        this.refs.toast.show(info);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "stretch", backgroundColor: "#FAFAFA" }}>
                <ScrollView style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={()=>this.refs.toast.show("该功能暂未实现")}>
                        <View style={{ margin: 10, marginBottom: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold", color: "#696969" }}>{this.state.name}</Text>
                                <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15, color: "#376B6D" }}>查看并编辑个人资料</Text>
                            </View>
                            <Image source={{uri:"https://www.jsjzx.top/Volunteer/Images/33.jpg"}}
                                style={{ width: 70, height: 70, borderRadius: 70, margin: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("FaceVerify", {
                        toast: this.toast,
                    })}>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>人脸认证</Text>
                            <Icon name="ios-journal" size={20} color={"#376B6D"} style={{ marginRight: 20 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("MyAppointment")}>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>预约记录</Text>
                            <Icon name="ios-bookmarks" size={20} color={"#376B6D"} style={{ marginRight: 20 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback onPress={()=>this.toast("该功能暂未提供")}>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>成为发布者</Text>
                            <Icon name="ios-business" size={20} color={"#376B6D"} style={{ marginRight: 20 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback onPress={()=>this.toast("该功能暂未提供")}>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>向我们反馈</Text>
                            <Icon name="ios-send" size={20} color={"#376B6D"} style={{ marginRight: 20 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("AlterPsw")}>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>修改密码</Text>
                            <Icon name="ios-film" size={20} color={"#376B6D"} style={{ marginRight: 20 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                    <TouchableWithoutFeedback onPress={() => {
                        storage.remove({
                            key: 'personInfo'
                        });
                        this.props.navigation.navigate("Auth")
                    }}>
                        <View style={{ margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: "#696969" }}>退出登录</Text>
                            <Icon name="md-planet" size={20} color={"#376B6D"} style={{ marginRight: 20 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Seperate />
                </ScrollView>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                />
            </View >
        )
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

export default MineScreen;