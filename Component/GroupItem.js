import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

class GroupItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleOnPress=()=>{
        let groupId=this.props.data.id;
        this.props.onPress(groupId);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.handleOnPress}>
                <View style={{ marginTop: 10,marginBottom:10, ...this.props.style }}>
                    <View style={{...styles.itemContainer, backgroundColor:"white"}}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>{this.props.data.groupName}</Text>
                        <Text style={{ fontSize: 18,  marginLeft: 10 }}>{this.props.data.groupMembers.length}人</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
        padding: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center",
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
})
export default GroupItem;