import React, { Component } from "react";
import { Image, View, ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import ImageSwpier from "../../../Component/ImageSwiper";
import Button from "../../../Component/Button";
import Back from "../../../Component/Back";
import Seperate from "../../../Component/Seperate";
import Icon from "react-native-vector-icons/Ionicons";
import url from "../../../url";
import Loading from "../../../Component/Loading";
import NoInternetScreen from "../../NoInternetScreen";
import Global from "../../../Global";

class RoomDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //id:this.props.navigation.getParam("id",-1),
            data: {},
            personId: -1,
            isNet: true,//是否链接网络
            isGetting: true,//是否获取数据
        }
    }

    getRoomDetail = () => {
        this.setState({ isGetting: true, isNet: true });
        let opts = {
            method: "GET"
        }
        let URL = url.getPlaceMsgStaff(this.props.navigation.getParam("id", -1));
        console.log(URL);
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 200) {
                    this.setState({ data: responseJson.data, isGetting: false });
                } else {
                    this.setState({ isGetting: false });
                    this.props.navigation.navigate("Message", { message: responseJson.msg });
                }
            }).catch((error) => {
                this.setState({ isNet: false });
                console.log(error);
            })
    }

    componentDidMount() {
        // this.getRoomDetail();
        this.setState({ isGetting: false, isNet: true });
        let id=this.props.navigation.getParam("id", -1);
        
        let data = {};
        Global.roomDetail.map((item)=>{
            if(item.id===id){
                data=item;
            }
        })

        this.setState({ data });
    }

    renderDevice = () => {
        let jsx = [];
        let { device } = this.state.data;
        if (device.indexOf(",") === -1) {
            jsx.push(
                <View key={1} style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Icon name="ios-flower" size={18} color={"#376B6D"} />
                    <Text style={{ marginLeft: 5, fontSize: 18 }}>{device}</Text>
                </View>);
        } else {
            let devices = device.split(",");
            devices.map((item, index) => jsx.push(
                <View key={index} style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Icon name="ios-flower" size={18} color={"#376B6D"} />
                    <Text style={{ marginLeft: 5, fontSize: 18 }}>{item}</Text>
                </View>));
        }
        return jsx;
    }

    reservation = () => {
        // let personId = this.state.data.personId;
        let data = { ...this.props.navigation.getParam("data", {}), place_id: this.state.data.id, place_name: this.state.data.name,address:this.state.data.address };
        this.props.navigation.navigate("HistoryPerson", { data: data });
    }

    render() {
        let { width, height } = Dimensions.get("window");
        return (
            <View style={{ flex: 1 }}>
                {this.state.isNet ? this.state.isGetting ? <Loading /> :
                    <View style={{ flex: 1 }}>
                        <View style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
                            <Back onPress={() => this.props.navigation.goBack()} />
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                            style={{ height: height * 0.85, backgroundColor: "#FAFAFA" }}>
                            <ImageSwpier imageWidth={width} imageHeight={height * 0.4}
                                slide={true} source={this.state.data.portraits} />
                            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 10, color: "#B54434", flexWrap: "wrap", marginRight: 20 }}>{this.state.data.name}</Text>
                            <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 20, marginTop: 10, flexWrap: "wrap", marginRight: 20 }}>{this.state.data.company_name}</Text>
                            <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 10, flexWrap: "wrap", marginRight: 20 }}>{this.state.data.address}</Text>
                            <Seperate />
                            <Text style={styles.itemTitle}>设备</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", ...styles.itemText }}>
                                {this.renderDevice()}
                                <View style={{ flex: 1 }} />
                            </View>
                            <Seperate />
                            <Text style={styles.itemTitle}>详情</Text>
                            <Text style={styles.itemText}>最多可容纳{this.state.data.capacity}人</Text>
                            <Text style={styles.itemText}>{this.state.data.introduction}</Text>
                            <Seperate />
                            <Text style={styles.itemTitle}>须知</Text>
                            <Text style={styles.itemText}>{this.state.data.instruction}</Text>
                        </ScrollView>
                        <View style={styles.bottomButton}>
                            <View style={{ flex: 3 }} />
                            <View style={{ flex: 2, alignItems: "flex-start", justifyContent: "center" }}>
                                <Button background={styles.buttonContainer} textStyle={styles.buttonText}
                                    title="预约" onPress={this.reservation} />
                            </View>
                        </View>
                    </View> : <NoInternetScreen onPress={this.getRoomDetail}
                        onBack={() => this.props.navigation.goBack()} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#FF5A5E",
        width: Dimensions.get("window").width * 0.3,
        height: Dimensions.get("window").height * 0.15 * 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
    itemTitle: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20,
        fontWeight: "bold",
    },
    itemText: {
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 10
    },
    bottomButton: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopWidth: 2,
        borderTopColor: "white",
        height: Dimensions.get("window").height * 0.1,
        width: Dimensions.get("window").width * 1.2,
        marginLeft: -Dimensions.get("window").width * 0.1,
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 5,
    }
})
export default RoomDetailScreen;