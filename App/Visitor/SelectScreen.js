import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { appBackgroundColor, backgourndColor } from "../../Style";
import DownArrow from "../../Component/DownArrow";

class SelectScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: appBackgroundColor }}>
                <View style={{
                    flex: 1, borderBottomWidth: 1, borderBottomColor: backgourndColor
                    , flexDirection: "row", justifyContent: "center", alignItems: "center"
                }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <Text style={styles.downTitle}>全部类型</Text>
                        <DownArrow size={10} color={backgourndColor} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity onPress={this.radius}>
                            <Text style={styles.downTitle}>附近</Text>
                            <DownArrow size={10} color={backgourndColor} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 9 }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    downTitle: {
        color: backgourndColor,
        margin: 5,
        fontSize: 15,
    }
})
export default SelectScreen;