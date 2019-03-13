import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";

class Reservation extends Component {
    constructor(props) {
        super(props);
    }
    handelPress = () => {
        this.props.onPress(this.props.data.appointmentId,this.props.data.attendees);
    }
    render() {
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ marginLeft: 10, fontSize: 25, color: "#376B6D", fontWeight: "bold" }}>●</Text>
                    <Text style={{ marginLeft: 10, fontSize: 25, color: "#376B6D", fontWeight: "bold" }}>{this.props.data.date}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <View style={{ margin: 10, flex: 3 }}>
                        <Text style={{ fontSize: 15, margin: 10 }}>时间:{this.props.data.time}</Text>
                        <Text style={{ fontSize: 15, margin: 10 }}>发起人:{this.props.data.organizer}</Text>
                        <Text style={{ fontSize: 15, margin: 10 }}>详情：{this.props.data.introduction}</Text>
                    </View>
                    <View style={{
                        flex: 1, borderTopWidth: 1, borderTopColor: "#C0C0C0",
                        alignItems: "center", justifyContent: "center"
                    }}>
                        <TouchableWithoutFeedback onPress={this.handelPress}>
                            <Text style={{ color: "#376B6D", fontWeight: "bold" }}>点击查看与会人员</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        margin: 10,
        height: Dimensions.get('window').height * 0.3,
        alignItems: "stretch",
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
})

export default Reservation;