import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

let DownArrow = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ ...props.style }}>
            <Icon name="ios-arrow-down" size={props.size} color={props.color ? props.color : "white"} />
        </TouchableOpacity>
    )
}

export default DownArrow;