import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            start: "",
            end: "",
        }
    }
    handelPress = () => {
        this.props.onPress(this.props.data.appointmentId, this.props.data.attendees);
    }

    componentDidMount() {
        let { start_time, end_time } = this.props.data;
        let date = start_time.substring(0, 10);
        let start = start_time.substring(11, 16);
        let end = end_time.substring(11, 16);
        this.setState({ date, start, end })
    }

    handelPress2 = () => {
        let date = new Date();
        console.log(date);
        let appointmentId = this.props.data.appointmentId;
        let string = "";
        this.props.cancle(appointmentId);
    }
    render() {
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginLeft: 10, fontSize: 25, color: "#376B6D", fontWeight: "bold" }}>●</Text>
                        <Text style={{ marginLeft: 10, fontSize: 25, color: "#376B6D", fontWeight: "bold" }}>{this.state.date}</Text>
                    </View>
                    {this.props.cancle === undefined ? null : <TouchableWithoutFeedback onPress={this.handelPress2}>
                        <Text style={{ marginRight: 20, fontSize: 18, color: "#376B6D", }}>取消会议</Text>
                    </TouchableWithoutFeedback>}
                </View>
                <View style={styles.itemContainer}>
                    <View style={{ margin: 10, flex: 3 }}>
                        <Text style={{ fontSize: 15, margin: 10 }}>时间:{this.state.start}~{this.state.end}</Text>
                        <Text style={{ fontSize: 15, margin: 10 }}>发起人:{this.props.data.organizer}</Text>
                        <Text style={{ fontSize: 15, margin: 10 }}>详情：{this.props.data.introduction}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={this.handelPress}>
                        <View style={{
                            flex: 1, borderTopWidth: 1, borderTopColor: "#C0C0C0",
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <Text style={{ color: "#376B6D", fontWeight: "bold" }}>点击查看与会人员</Text>

                        </View>
                    </TouchableWithoutFeedback>
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