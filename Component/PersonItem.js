import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

class PersonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false,
        }
    }

    handleSelect = () => {
        let select=!this.state.select;
        this.props.onSelect(this.props.data.id, this.props.data.name,select);
        this.setState({select:select});
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onSelect?this.handleSelect:null}>
                <View style={{ margin: 10, marginTop: 5, ...this.props.style }}>
                    {this.props.select ? null : <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, color: "#376B6D", fontWeight: "bold" }}>●</Text>
                        <Text style={{ marginLeft: 10, fontSize: 20, color: "#376B6D", fontWeight: "bold" }}>{this.props.data.identity}</Text>
                    </View>}
                    <View style={{...styles.itemContainer, backgroundColor: this.state.select ? "#E9F7EA" : "white"}}>
                        <Image source={require("./weather.jpg")} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>{this.props.data.name}</Text>
                        {this.props.select ? null : <Text style={{ fontSize: 18, fontWeight: "bold", position: "absolute", right: 10 }}>{this.props.history?this.props.data.state:null}</Text>}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        margin: 10,
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
export default PersonItem;