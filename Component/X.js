import React from "react";
import {TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

let X = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Icon name="ios-close" size={40} color="black" style={{ margin: 10 }} />
        </TouchableWithoutFeedback>
    )
}

export default X;