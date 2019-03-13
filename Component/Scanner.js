import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from "react-native";

let Scanner = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{marginRight:10}}>
            <Icon name="md-qr-scanner" size={40} color="#A9A9A9" />
        </TouchableOpacity>
    );
}

export default Scanner;